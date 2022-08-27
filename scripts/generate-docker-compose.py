import argparse
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple


def read_language_list(languages_file: Path) -> List[str]:
    with open(languages_file, "r") as f:
        return f.read().splitlines()


def generate_service(language: str):
    return {"build": language, "volumes": [f"$PWD/results/{language}:/results"]}


def generate_docker_compose(languages: List[str]) -> Dict[str, Any]:
    services = {language: generate_service(language) for language in languages}
    return {"version": "3.9", "services": services}


def get_cli_args() -> Tuple[Path, Path]:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "languages_file", type=Path, default=Path(".") / "languages.txt"
    )
    parser.add_argument(
        "output_file", type=Path, default=Path(".") / "docker-compose.yaml"
    )
    args = parser.parse_args()
    return args.languages_file, args.output_file


if __name__ == "__main__":
    languages_file, output_file = get_cli_args()
    languages = read_language_list(languages_file)
    docker_compose = generate_docker_compose(languages)
    with open(output_file, "w") as f:
        json.dump(docker_compose, f)
