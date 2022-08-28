import argparse
import json
from typing import Any, Dict, List


def generate_service(language: str):
    return {
        "build": f"benchmarks/{language}",
        "volumes": [f"$PWD/../results/{language}:/results"],
    }


def generate_docker_compose(languages: List[str]) -> Dict[str, Any]:
    services = {language: generate_service(language) for language in languages}
    return {"version": "3.9", "services": services}


def get_cli_args() -> List[str]:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "languages",
        type=str,
        nargs="+",
    )
    args = parser.parse_args()
    return args.languages


if __name__ == "__main__":
    languages = sorted(get_cli_args())
    docker_compose = generate_docker_compose(languages)
    docker_compose_json = json.dumps(docker_compose)
    print(docker_compose_json)
