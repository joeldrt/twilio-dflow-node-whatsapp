# Whatsapp Twilio simple product check / order

Nodejs / Express js / Mongo DB warehouse backend executed by Dialogflow accessed by Whatsapp through Twilio

## To use

send the next whatsapp message

```
join diameter-poor
```

to

```
+1 415 523 8886
```

### Fetching product by id

```
request (example, numeric_product_id=462):
Check #<numeric_product_id>

response (example):
CODE: 462,
NAME: ECCO CEBADA,
DESCRIPTION: ECCO CEBADA 58GR*48UN,
PRICE: 21.45
INVENTORY: 80
```

### Making an order

```
request (example, numeric_product_id=462):
-Order  30 of #<numeric_product_id>

response (example):
Order created with ID: 61527f457f89bdc47c327b3e
```

### Making an BULK order

```
request:
-Order  30 of #5487, 3 of #470, 21 of #39964581, 67 of #30301, 5 of #462

response (example):
ERROR - PID: 5487 / Amount: 30
404 product not found
OK - PID: 470 / Amount: 3
61528253c30d2e7382a08fb2
ERROR - PID: 39964581 / Amount: 21
404 product not found
ERROR - PID: 30301 / Amount: 67
404 product not found
OK - PID: 462 / Amount: 5
61528253c30d2e7382a08fb7
```

### Download warehouse stock entries xlsx file

navigate to path

```
<domain>/warehouse/excel/download
```

In this case

[https://448a-2806-2f0-7021-5427-8b86-39d4-9e89-881e.ngrok.io/warehouse/excel/download](https://448a-2806-2f0-7021-5427-8b86-39d4-9e89-881e.ngrok.io/warehouse/excel/download)
