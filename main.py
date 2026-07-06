from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to TestApp!"}

# In-memory storage for items (replace with a database in a real application)
items_db = {}
next_item_id = 1

@app.get("/items")
def get_items():
    return list(items_db.values())

@app.post("/items")
def create_item(item: dict):
    global next_item_id
    item_id = next_item_id
    items_db[item_id] = {"id": item_id, **item}
    next_item_id += 1
    return items_db[item_id]

@app.get("/items/{item_id}")
def get_item(item_id: int):
    return items_db.get(item_id)

@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict):
    if item_id in items_db:
        items_db[item_id].update(item)
        return items_db[item_id]
    return {"message": "Item not found"}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    if item_id in items_db:
        del items_db[item_id]
        return {"message": "Item deleted successfully"}
    return {"message": "Item not found"}
