export const lessonContent = {
  1: {
    title: "What is",
    highlight: "SQL?",
    subtitle: "And why is it one of the most valuable skills you can learn in tech?",
    hasExercise: false,

    points: [
      "What a database is and why every app needs one",
      "The difference between a database, a table, a row, and a column",
      "Why SQL has remained the #1 data language for 50+ years",
      "Key terminology you will use throughout your career"
    ],

    blocks: [
      {
        type: "query",
        heading: "Every App you Love Runs on a Database",
        subtitle: "When you scroll Instagram, the app sends a SQL query that looks something like:",
        code: `SELECT post_id, image_url, caption, like_count 
FROM posts 
WHERE user_id IN (
    Select following_id FROM followers WHERE user_id = ?;
)
ORDER BY created_at DESC
LIMIT 20;`,
        explanation: "This query runs millions of times per second at scale, SQL is the universal language of data."
      },

      {
        type: "summaryTable",
        title: "Key Terminology",
        headers: ["Term", "What It Means", "Real-World Analogy"],
        rows: [
          ["Database", "A container holding all related tables", "All of Swiggy's data - users, restaurants, orders"],
          ["Table", "One entity stored as rows + columns", `The "orders" spreadsheet inside Swiggy's database`],
          ["Row / Record", "A single record in a table", "A single order placed by Ananya"],
          ["Column / Field", "One attribute of each row", `The "total_amount" column in the orders table`],
          ["Primary Key", "Unique ID - no two rows share it", `Your Aadhaar number`],
          ["Foreign Key", "A column that links to another table's primary key", `order.customer_id --> customer.customer_id`],
          ["Query", "A SQL statement asking a question or giving a command", `SELECT name FROM  employees WHERE salary > 7000`],
          ["Schema", "The structure definition of a database", `The blueprint listing all tables and their columns`],
        ]
      }, 

      {
        type: "note",
        heading: "Engineering Insight:",
        explanation: "At Google, databases can have tables with trillions of rows annd schemas with hundreds of tables. Yet the SQL you write today is the same SQL engineers write at Google - the language scales from 8 rows to 8 trillion."
      },

      // {
      //   type: "text",
      //   value: "SQL is used to communicate with databases."
      // },

      // {
      //   type: "card",
      //   title: "DATABASE",
      //   value: "Collection of structured data"
      // },

      // {
      //   type: "grid",
      //   items: ["Database", "Table", "Row", "Column"]
      // },

      // {
      //   type: "table",
      //   title: "employees",
      //   headers: ["id", "name", "salary"],
      //   rows: [
      //     ["1", "Arjun", "85000"],
      //     ["2", "Priya", "72000"]
      //   ]
      // },
    ]
  },

  2: {
    title: "Your Sample",
    highlight: "Database",
    subtitle: "And why is it one of the most valuable skills you can learn in tech?",
    hasExercise: false,

    points: [
      "The five tables we will query throughout every chapter",
      "How tables relate to each other via primary and foreign keys",
      "How to read and interpret a database schema"
    ],

    blocks: [
      {
        type: "table",
        title: "employees",
        headers: ["emp_id", "name", "department", "salary", "manager_id", "hire_date"],
        rows: [
          ["1", "Arjun", "IT", "85000", null, "2020-06-15"],
          ["2", "Priya", "Marketing", "72000", 1, "2019-03-20"],
          ["3", "Rahul", "IT", "80000", 1, "2021-01-10"],
          ["4", "Sneha", "HR", "65000", null, "2018-11-05"],
          ["5", "Vikram", "Marketing", "70000", 2, "2020-02-25"],
          ["6", "Ananya", "IT", "78000", 1, "2021-07-01"],
          ["7", "Kavya", "HR", "62000", 4, "2019-08-12"],
          ["8", "Rohan", "IT", "77000", 1, "2022-03-15"]
        ]
      },

      {
        type: "table",
        title: "products",
        headers: ["product_id", "name", "category", "price", "stock"],
        rows: [
          ["1", "iPhone", "Electronics", "79999", "50"],
          ["2", "SQL Book", "Books", "499", "200"],
          ["3", "Headphones", "Electronics", "2999", "75"],
          ["4", "Notebook", "Stationery", "99", "500"],
          ["5", "Laptop", "Electronics", "65000", "20"],
          ["6", "Pen Set", "Stationery", "149", "0"],
        ]
      },

      {
        type: "table",
        title: "customers",
        headers: ["customer_id", "name", "city", "country"],
        rows: [
          ["1", "Ananya", "Hyderabad", "India"],
          ["2", "Rohan", "Bangalore", "India"],
          ["3", "Sam", "Mumbai", "India"],
          ["4", "Lisa", "London", "UK"],
          ["5", "Ravi", "Delhi", "India"],
        ]
      },

      {
        type: "table",
        title: "orders",
        headers: ["order_id", "customer_id", "order_date", "total", "status"],
        rows: [
          ["1", "1", "2024-01-15", "79999", "completed"],
          ["2", "2", "2024-01-20", "3498", "completed"],
          ["3", "1", "2024-02-10", "65000", "completed"],
          ["4", "3", "2024-02-14", "499", "pending"],
          ["5", "2", "2024-03-01", "248", "completed"],
          ["6", "5", "2024-03-15", "2999", "shipped"],
          ["7", "1", "2024-04-05", "149", "completed"],
        ]
      },

      {
        type: "table",
        title: "orders_items",
        headers: ["item_id", "order_id", "product_id", "qty", "unit_price"],
        rows: [
          ["1", "1", "1", "1", "79999"],
          ["2", "2", "3", "1", "2999"],
          ["3", "2", "2", "1", "499"],
          ["4", "3", "5", "1", "65000"],
          ["5", "4", "2", "1", "499"],
          ["6", "5", "4", "2", "99"],
          ["7", "5", "6", "1", "50"],
          ["8", "6", "3", "1", "2999"],
        ]
      },

      {
        type: "summaryTable",
        title: "How the Tables Connect",
        headers: ["Table Name", "Description", "Key Columns"],
        rows: [
          ["orders -> customers", "order.customer_id", "customer.customer_id"],
          ["order_items -> orders", "order_items.order_id", "order.order_id"],
          ["order-items -> products", "order_items.product_id", "product.product_id"],
          ["employees -> employees", "employees.manager_id", "employee.emp_id (self-reference)"]
        ]
      },

      {
        type: "note",
        heading: "Note:",
        explanation: `Lisa (customer_id 4) has no orders. Pen Set (product_id 6) has stock = 0. These "edge cases" are intentional — they are used to illustrate LEFT JOIN and NULL behaviour in later chapters.`
      },
    ]
  },

  3: {
      highlight: "SELECT",
      subtitle: "Reading data — every SQL journey starts here.",
      hasExercise: false,

      points: [
        "Reading specific columns with SELECT",
        "Using * to select all columns",
        "Renaming columns with AS aliases",
        "Doing calculations in SELECT",
        "Removing duplicate rows with DISTINCT"
      ],

      blocks: [

      ]
    }
};