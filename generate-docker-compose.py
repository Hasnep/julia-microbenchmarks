import json
from pathlib import Path


def generate_service(language: str):
    return {"build": language, "volumes": [f"$PWD/results/{language}:/results"]}


if __name__ == "__main__":
    with open(Path(".") / "languages.txt", "r") as f:
        languages = f.read().splitlines()

    services = {language: generate_service(language) for language in languages}

    docker_compose = {"version": "3.9", "services": services}

    with open(Path(".") / "docker-compose.yaml", "w") as f:
        json.dump(docker_compose, f)
