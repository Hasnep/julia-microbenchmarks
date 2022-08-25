import json
from pathlib import Path
from typing import List, Any, Dict


def read_language_list(languages_file: Path) -> List[str]:
    with open(languages_file, "r") as f:
        return f.read().splitlines()


def generate_service(language: str):
    return {"build": language, "volumes": [f"$PWD/results/{language}:/results"]}


def generate_docker_compose(languages: List[str]) -> Dict[str, Any]:
    services = {language: generate_service(language) for language in languages}
    return {"version": "3.9", "services": services}


if __name__ == "__main__":
    languages = read_language_list(Path(".") / "languages.txt")

    docker_compose = generate_docker_compose(languages)

    with open(Path(".") / "docker-compose.yaml", "w") as f:
        json.dump(docker_compose, f)
