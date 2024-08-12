# uekat-master-degree-studies-thesis-app

UE Katowice - Master Degree Studies - Thesis - App

## Requirements

- [Python 3.12.5](https://www.python.org)

## Installation

### Dependencies

1. Create venv:

```sh
python -m venv venv
```

2. Source activate script:

```sh
source venv/bin/activate
```

3. Install requirements:

```sh
pip install -r requirements.txt
```

### Configuration

1. Copy .env:

```sh
cp .env.example .env
```

2. Fill .env variables.

3. Copy model to `tmp/model.pth`.

## Run

```sh
source venv/bin/activate
python main.py
```
