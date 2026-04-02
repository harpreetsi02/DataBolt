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
      title: "SELECT",
      highlight: "Query",
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
          type: "queryTable",
          title: "3.1 - Select Specific Columns",
          subtitle: "You almost never want every column. Pick what you need.",
          queryName: "SQL",
          code: `SELECT name, salary 
FROM employees;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "3.2 - Column Aliases with AS",
          queryName: "SQL",
          code: `SELECT name AS 'Employee',
        salary AS 'Monthly Salary',
        salary * 12 AS 'Annual CTC'
FROM employees;`,
          data: dbTables.employees
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
    },

    4: {
      title: "FILTERING -",
      highlight: "WHERE",
      subtitle: "WHERE filters which rows come back. Without it, you get every row.",
      hasExercise: false,

      points: [
        "Filtering rows with a single condition",
        "All comparison operators: =, !=, >, <, >=, <=",
        "Filtering numbers, text, and dates"
      ],

      blocks: [
        {
          type: "noteGreen",
          heading: "Think of it this way:",
          explanation: `WHERE is the bouncer at the door. Only rows that satisfy the condition get through to your result. Everyone else it turned away.`,
        },

        {
          type: "queryTable",
          title: "4.1 - Basic Syntax",
          queryName: "SQL",
          code: `SELECT name, department, salary 
FROM employees
WHERE department = 'IT';`,
          data: dbTables.employees
        },

        {
        type: "summaryTable",
        title: "4.2 -All Comparison Operators",
        headers: ["OPERATOR", "MEANING", "EXAMPLE"],
        rows: [
          ["=", "Exact equal", "department = 'IT'"],
          ["!= or <>", "Not equal", `status != 'completed'`],
          [">", "Greater than", "salary > 70000"],
          ["<", "Less than", `salary < 60000`],
          [">=", "Greater than or equal", `slalary >= 72000`],
          ["<=", "Less than or equal", `salary <= 62000`]
          ]
        },  
        {
          type: "queryTable",
          queryName: "Find employees more than 70000",
          code: `SELECT name, salary 
FROM employees
WHERE salary > 70000;`,
          data: dbTables.employees
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT * FROM employees WHERE department = 'IT';",
            "SELECT * FROM employees WHERE salary > 60000;",
            "SELECT * FROM employees WHERE department = 'IT' AND salary > 60000;",
            "SELECT * FROM employees WHERE department = 'HR' OR department = 'Marketing';",
            "SELECT * FROM employees WHERE manager_id IS NULL;"
          ],
          questions: [
            "Find all employees who work in the IT department",
            "Find employees with salary greater than 60000.",
            "Find employees who work in IT and earn more than 60000.",
            "Find employees who are in HR or Marketing.",
            "Find employees who do not have a manager."
          ],
        }
      ],
    },

    5: {
      title: "AND, OR,",
      highlight: "NOT",
      subtitle: "Combining multiple conditions into one filter.",
      hasExercise: false,

      points: [
        "AND: both conditions must be true",
        "OR: at least one condition must be true",
        "NOT: invert a condition",
        "Parentheses to control evaluation order"
      ],

      blocks: [
        {
          type: "queryTable",
          queryName: "IT employees earning > 70,000",
          code: `SELECT name, department, salary 
FROM employees
WHERE department = 'IT' AND salary > 70000;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          queryName: "IT or HR employees",
          code: `SELECT name, department 
FROM employees
WHERE department = 'IT' OR department = 'HR';`,
          data: dbTables.employees
        },

        {
          type: "query",
          heading: "5.3 - NOT",
          subtitle: "Everyone except Salses",
          code: `SELECT name, department 
FROM employees
WHERE NOT department = 'Sales';`,
        },

        {
          type: "queryTable",
          title: "5.4 - Parentheses - Always Be Explicit",
          subtitle: "❌ Common Mistake: AND has higher precedence than OR, just like multiplication vs addition in maths. WHERE a OR b AND c is evaluated as WHERE a OR (b AND c), which is almost never what you intended. Always use parentheses",
          queryName: "Sales employees, OR IT employees earning > 80,000",
          code: `SELECT name, department, salary 
FROM employees
WHERE department = 'Sales'
      OR (department = 'IT' AND salary > 80000);`,
          data: dbTables.employees
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT name, department, salary FROM employees WHERE department = 'IT' AND salary > 70000;",
            "SELECT name, department FROM employees WHERE department = 'HR' OR department = 'Sales';",
            "SELECT name, salary, department FROM employees WHERE salary < 60000 OR department = 'IT';",
            "SELECT name, department FROM employees WHERE NOT department = 'Sales';",
            "SELECT name, manager_id FROM employees WHERE manager_id IS NOT NULL;",
            "SELECT name, department, salary FROM employees WHERE (department = 'IT' OR department = 'HR') AND salary > 60000 AND NOT department = 'Sales';"
          ],
          questions: [
            "Find employees who are in IT and have salary greater than 70000.",
            "Find employees who are in HR or Sales.",
            "Find employees who have salary less than 60000 or work in IT.",
            "Find employees who are not in Sales department.",
            "Find employees who do have a manager (i.e., manager_id is NOT NULL)",
            "Find employees who: are in IT or HR, and salary greater than 60000, and not in Sales",
          ],
        }
      ],
    },

    6: {
      title: "IN, BETWEEN,",
      highlight: "LIKE",
      subtitle: "More advanced filtering tools for specific scenarios.",
      hasExercise: false,

      points: [
        "IN: filter by a list of values",
        "BETWEEN: filter by a range of values",
        "LIKE: filter by pattern matching with wildcards"
      ],

      blocks: [
        
      ]
    }

};