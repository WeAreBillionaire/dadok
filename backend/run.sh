#!/bin/bash

source ~/dadok/backend/venv/bin/activate

cd ~/dadok/backend

uvicorn main:app --reload --host 0.0.0.0 --port 8000