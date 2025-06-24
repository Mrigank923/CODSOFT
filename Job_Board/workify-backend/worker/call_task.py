form tasks import add
result = add.delay(4,6)
print("Task ID:",result.id)
