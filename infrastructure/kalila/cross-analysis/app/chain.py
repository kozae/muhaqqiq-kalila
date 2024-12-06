def chain(client):
    chat_completion = client.chat.completions.create(
        model="gpt-4o-mini", messages=[{"role": "user", "content": "Tell me a joke"}]
    )
    return chat_completion.model_dump_json()
