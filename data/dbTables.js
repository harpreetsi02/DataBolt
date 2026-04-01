export const dbTables = {
  employees: {
    headers: ["emp_id", "name", "department", "salary", "manager_id", "hire_date"],
    rows: [
      [1, "Arjun", "IT", 85000, null, "2020-06-15"],
      [2, "Priya", "Marketing", 72000, 1, "2021-03-10"],
      [3, "Rahul", "IT", 55000, 5, "2022-01-20"],
      [4, "Sneha", "HR", 6000, 5, "2021-07-08"],
      [5, "Vikram", "Marketing", 90000, null, "2019-11-01"],
      [6, "Ananya", "IT", 68000, 1, "2023-02-14"],
      [7, "Kavya", "HR", 58000, 4, "2022-08-30"],
      [8, "Rohan", "IT", 62000, 5, "2023-05-12"]
    ]
  },

  products: {
    headers: ["product_id", "name", "category", "price", "stock"],
    rows: [
      [1, "iPhone", "Electronics", 79999, 50],
      [2, "SQL Book", "Books", 499, 200],
      [3, "Headphones", "Electronics", 2999, 75],
      [4, "Notebook", "Stationery", 99, 500],
      [5, "Laptop", "Electronics", 65000, 20],
      [6, "Pen Set", "Stationery", 149, 0]
    ]
  },

  customers: {
    headers: ["customer_id", "name", "city", "country"],
    rows: [
      [1, "Ananya", "Hyderabad", "India"],
      [2, "Rohan", "Bangalore", "India"],
      [3, "Sam", "Mumbai", "India"],
      [4, "Lisa", "London", "UK"],
      [5, "Ravi", "Delhi", "India"]
    ]
  },

  orders: {
    headers: ["order_id", "customer_id", "order_date", "total", "status"],
    rows: [
      [1, 1, "2024-01-15", 79999, "completed"],
      [2, 2, "2024-01-20", 3498, "completed"],
      [3, 1, "2024-02-10", 65000, "completed"],
      [4, 3, "2024-02-14", 499, "pending"],
      [5, 2, "2024-03-01", 248, "completed"],
      [6, 5, "2024-03-15", 2999, "shipped"],
      [7, 1, "2024-04-05", 149, "completed"]
    ]
  },

  order_items: {
    headers: ["item_id", "order_id", "product_id", "qty", "unit_price"],
    rows: [
      [1, 1, 1, 1, 79999],
      [2, 2, 3, 1, 2999],
      [3, 2, 2, 1, 499],
      [4, 3, 5, 1, 65000],
      [5, 4, 2, 1, 499],
      [6, 5, 4, 2, 99],
      [7, 5, 6, 1, 50],
      [8, 6, 3, 1, 2999]
    ]
  }
};