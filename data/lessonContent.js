import { dbTables } from "./dbTables";

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
        data: dbTables.employees
      },

      {
        type: "table",
        title: "products",
        data: dbTables.products
      },

      {
        type: "table",
        title: "customers",
        data: dbTables.customers
      },

      {
        type: "table",
        title: "orders",
        data: dbTables.orders
      },

      {
        type: "table",
        title: "orders_items",
        data: dbTables.order_items
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
        {

        },
        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT name FROM employees;",
            "SELECT department FROM employees;",
            "SELECT name, department FROM employees;",
            "SELECT name, salary FROM employees;",
            "SELECT * FROM employees;"
          ],
          questions: [
            "Find all employee names",
            "Find all departments",
            "Find name and department",
            "Find name and salary",
            "Show all data"
          ],
        }
      ]
    }
};