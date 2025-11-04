from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pytesseract
import google.generativeai as genai
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="다독 API")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini 설정
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
for m in genai.list_models():
    print(m.name)
model = genai.GenerativeModel('gemini-2.5-pro')

@app.get("/")
def read_root():
    return {"message": "다독 API 서버"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/analyze")
async def analyze_document(file: UploadFile = File(...)):
    try:
        # 이미지 읽기
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # OCR로 텍스트 추출 (한글)
        text = pytesseract.image_to_string(image, lang='kor')
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="텍스트를 추출할 수 없습니다")
        
        # Gemini API로 쉽게 변환
        prompt = f"""다음은 공문서 내용입니다. 노인분들도 이해하기 쉽게 설명해주세요:

{text}

- 어려운 용어는 쉬운 말로 바꿔주세요
- 핵심 내용을 간단명료하게 정리해주세요
- 해야 할 일이 있다면 명확히 알려주세요"""

        response = model.generate_content(prompt)
        easy_text = response.text
        
        return {
            "original": text,
            "simplified": easy_text
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)