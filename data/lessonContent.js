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
      },{
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
      title: "BETWEEN, IN,",
      highlight: "LIKE",
      subtitle: "Smarter filters for rnages, lists, and patterns.",
      hasExercise: false,

      points: [
        "BETWEEN for range filtering (inclusive)",
        "IN to match against a list of values",
        "NOT IN to exclude a list",
        "LIKE with % and _ wildcards for pattern matching"
      ],

      blocks: [
        {
          type: "queryTable",
          title: "6.1 - BETWEEN",
          queryName: "Salary between 60000 and 75000",
          code: `SELECT name, salary 
FROM employees
WHERE salary BETWEEN 60000 AND 75000;`,
          data: dbTables.employees
        },

        {
          type: "noteBlue",
          heading: "Note:",
          explanation: "BETWEEN is inclusive on both ends. BETWEEN 60000 AND 75000 is exactly equivalent to salary >= 60000 AND salary <= 75000"
        },

        {
          type: "queryTable",
          title: "6.2 - IN",
          queryName: "Employes in IT or HR",
          code: `SELECT name, department 
FROM employees
WHERE department IN ('IT', 'HR');`,
          data: dbTables.employees
        },  
        
        {
          type: "noteGreen",
          heading: "Pro Tip:",
          explanation: "IN is cleaner than chaining multiple OR conditions. WHERE dept IN ('IT','HR','Finance','Legal') vs four OR conditions — it's more readable and equally fast"
        },

        {
          type: "summaryTable",
          title: "6.3 - LIKE Pattern Matching",
          headers: ["Pattern", "Matches", "Example matches"],
          rows: [
            ["LIKE 'A%'", "Starts with A", "Arjun, Ananya"],
            ["LIKE '%a'", "Ends with a", "Priya, Sneha, Divya, Meera"],
            ["LIKE '%i%'", "Contains i anywhere", "Priya, Vikram, Divya, Kiran"],
            ["LIKE '_i%'", "Second character is i", "Vikram, Divya, Kiran"],
            ["LIKE 'S___h'", "5 chars: S + 3 any h", "Sneha"]
          ]
        },

        {
          type: "queryTable",
          queryName: "Names ending with 'a'",
          code: `SELECT name 
FROM employees
WHERE name LIKE '%a';`,
          data: dbTables.employees
        }, 

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT name, salary FROM employees WHERE salary BETWEEN 60000 AND 80000;",
            "SELECT name, hire_date FROM employees WHERE hire_date BETWEEN '2021-01-01' AND '2022-12-31';",
            "SELECT name, department FROM employees WHERE department IN ('IT', 'HR');",
            "SELECT name FROM employees WHERE name LIKE 'R%';",
            "SELECT name, department, salary FROM employees WHERE department IN ('IT', 'Sales') AND salary BETWEEN 60000 AND 90000;"
          ],
          questions: [
            "Find employees whose salary is between 60000 and 80000.",
            "Find employees hired between 2021-01-01 and 2022-12-31.",
            "Find employees who are in IT or HR using IN.",
            "Find employees whose name starts with 'R'.",
            "Find employees: who are in IT or Sales, and have salary between 60000 and 90000."
          ],
        }
      ]
    },

    7: {
      title: "NULL - The ",
      highlight: "Mystery Value",
      subtitle: "The concept that trips up almost every SQL beginner.",
      hasExercise: false,

      points: [
        "What NULL actually means (and what it does not mean)",
        "IS NULL and IS NOT NULL — the only correct way to check for NULL",
        "Why NULL = NULL is not TRUE in SQL",
        "COALESCE to handle NULL gracefully"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: `NULL is the answer to 'what is the name of your 10th child?' — it is not 'nothing' or 'empty'. It is 'this value does not exist / is unknown.' SQL treats it completely differently from zero or empty string.`
        },

        {
          type: "queryTable",
          title: "7.1 - Finding NULLs",
          queryName: "Top-level employees with no manager",
          code: `SELECT name, manager_id 
FROM employees
WHERE manager_id IS NULL;`,
          data: dbTables.employees
        },

        {
          type: "query",
          heading: "7.2 - The NULL = NULL Trap",
          subtitle: "❌ Common Mistake: WHERE manager_id = NULL will ALWAYS return 0 rows. NULL = NULL evaluates to NULL (unknown), not TRUE. This is defined by the SQL standard. Always use IS NULL or IS NOT NULL.",
          code: `SELECT * FROM employees WHERE manager_id = NULL; ----> Returns 0
rows - WRONG
SELECT * FROM employees WHERE manager_id IS NULL; ----> Returns 2
rows - CORRECT`,
        },

        {
          type: "queryTable",
          title: "7.3 - COALESCE",
          queryName: "Show 'No Manager' where manager_id is NULL",
          code: `SELECT name, COALESCE(CAST(manager_id AS CHAR), 'No Manager') AS 
       reports_to
FROM employees;`,
          data: dbTables.employees
        },

        {
          type: "note",
          heading: "Engineering Insight:",
          explanation: `COALESCE is invaluable in analytics. When calculating revenue per customer, a NULL (no orders) should show ₹0, not distort averages. COALESCE(SUM(total), 0) handles this cleanly.`
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT name FROM employees WHERE manager_id IS NULL;",
            "SELECT name, manager_id FROM employees WHERE manager_id IS NOT NULL;",
            "SELECT name, department FROM employees WHERE manager_id IS NULL AND department = 'Sales';"
          ],
          questions: [
            "Find employees who do not have a manager (manager_id is NULL).",
            "Find employees who have a manager (manager_id is NOT NULL).",
            "Find employees who do not have a manager and are in Sales department."
          ],
        }
      ]
    },

    8: {
      title: "ORDER,",
      highlight: "BY",
      subtitle: "Controlling the sequence of your results.",
      hasExercise: false,

      points: [
        "Ascending (ASC) and descending (DESC) sort",
        "Sorting by multiple columns — primary and secondary sort",
        "Sorting by expressions and aliases"
      ],

      blocks: [
        {
          type: "queryTable",
          title: "8.1 - Ascending and Descending",
          queryName: "Emloyees sorted by salary - lowest first",
          code: `SELECT name, salary 
FROM employees
ORDER BY salary ASC;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "8.2 - Multi-Column Sort",
          queryName: "Group by department, then rank by salary within each group",
          code: `SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;`,
          data: dbTables.employees
        },

        {
          type: "noteBlue",
          heading: "Note:",
          explanation: "SQL reads ORDER BY columns left to right: first sort by department (A→Z), then within each department sort by salary (high→low)."
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT name, salary FROM employees ORDER BY salary ASC;",
            "SELECT name, salary FROM employees ORDER BY salary DESC;",
            "SELECT name, department FROM employees ORDER BY department ASC;",
            "SELECT name, department, salary FROM employees ORDER BY department ASC, salary DESC;"
          ],
          questions: [
            "Sort employees by salary in ascending order.",
            "Sort employees by salary in descending order.",
            "Sort employees by department in alphabetical order.",
            "Sort employees by department (A-Z) and within each department by salary (highest first)."
          ],
        }
      ]
    },

    9: {
      title: "LIMIT &",
      highlight: "OFFSET",
      subtitle: `Pagination — how every "Load More" button in every app works.`,
      hasExercise: false,

      points: [
        "LIMIT N - GET only the top N rows",
        "LIMIT + OFFSET for page-based pagination",
        "The pagination formula every backend engineer uses"
      ],

      blocks: [
        {
          type: "queryTable",
          title: "9.1 - Top N",
          queryName: "Top 3 earners",
          code: `SELECT name, salary 
FROM employees
ORDER BY salary DESC
LIMIT 3;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "9.2 - Pagination with OFFSET",
          queryName: "Page 2 of employees (3 per page)",
          code: `-- Page formula: OFFSET = (page_number - 1) * page_size
SELECT name FROM employees
ORDER BY name LIMIT 3 OFFSET 3; -- Page 2`,
          data: dbTables.employees
        },

        {
          type: "noteGreen",
          heading: "Pro Tip:",
          explanation: "Always include ORDER BY when using LIMIT/OFFSET. Without ORDER BY, the database returns rows in an arbitrary order — pagination results will be inconsistent and unpredictable across queries."
        },

        {
          type: "note",
          heading: "Engineering Insight:",
          explanation: "At scale, OFFSET-based pagination is inefficient — to get page 1000 the database still reads 999*page_size rows and throws them away. Senior engineers use 'keyset pagination' (WHERE id > last_seen_id) which is O(1) regardless of page number."
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT * FROM employees LIMIT 3;",
            "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 2;",
            "SELECT * FROM employees LIMIT 3 OFFSET 2;",
            "SELECT name, department FROM employees ORDER BY name ASC LIMIT 4 OFFSET 1;",
            "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3 OFFSET 2;"
          ],
          questions: [
            "Show only the first 3 employees.",
            "Find top 2 highest paid employees.",
            "Skip first 2 employees and show next 3 employees.",
            "Sort employees by name and show 4 employees after skipping the first one.",
            "Find 3 employees with high salaries after skipping top 2 highest paid employees."
          ],
        }
      ]
    },

    10: {
      title: "Aggregate",
      highlight: "Functions",
      subtitle: "Turning millions of rows into a single meaningful number.",
      // hasExercise: true,

      points: [
        "COUNT — how many rows (with and without NULLs)",
        "SUM, AVG — totals and averages",
        "MIN, MAX — extremes",
        "Combining multiple aggregates "
      ],

      blocks: [
        {
          type: "noteGreen",
          heading: "Think of it this way:",
          explanation: "Aggregate functions are like a cashier totalling your bill. You bring 20 items (rows) to the counter; they give you back one number (the total). The individual items are collapsed into a single summary."
        },

        {
          type: "queryTable",
          title: "10.1 - Pagination with OFFSET",
          queryName: "How many employees?",
          code: `SELECT COUNT(*) AS total_employees FROM employees;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "COUNT (*) vs COUNT(column)",
          queryName: "SQL",
          code: `SELECT COUNT(*) AS all_rows,
      COUNT(manager_id) AS has_manager
FROM employees;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "10.2 - SUM, AVG, MIN, MAX",
          queryName: "Full payroll summary",
          code: `SELECT
    COUNT(*) AS headcount,
    SUM(salary) AS total_payroll,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) 
FROM employees;`,
          data: dbTables.employees
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT COUNT(*) FROM employees;",
            "SELECT COUNT(*) FROM employees WHERE department = 'IT';",
            "SELECT SUM(salary) FROM employees;",
            "SELECT SUM(salary) FROM employees WHERE department = 'HR';",
            "SELECT AVG(salary) FROM employees;",
            "SELECT MIN(salary) FROM employees;",
            "SELECT MAX(salary) FROM employees;",
            "SELECT AVG(salary) FROM employees WHERE department = 'Sales';"
          ],
          questions: [
            "Find the total number of employees.",
            "Find the number of employees in IT department.",
            "Find the total salary of all employees.",
            "Find the total salary of employees in HR department.",
            "Find the average salary of all employees.",
            "Find the minimum salary among all employees.",
            "Find the maximum salary among all employees.",
            "Find the average salary of employees in Sales department."
          ],
        }
      ]
    },

    11: {
      title: "GROUP",
      highlight: "BY",
      subtitle: "Aggregating by category — the analytics workhorse.",
      // hasExercise: true,

      points: [
        "How GROUP BY splits data into buckets before aggregating",
        "Grouping by a single column",
        "Grouping by multiple columns",
        "Combining GROUP BY with WHERE"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "GROUP BY is like sorting coins into labelled bags — all 1-rupee coins into one bag, all 5-rupee into another — and then counting each bag separately. Each bag becomes one row in your result."
        },

        {
          type: "queryTable",
          title: "11.1 - Employees Department",
          queryName: "SQL",
          code: `SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;`,
          data: dbTables.employees
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT department, COUNT(*) FROM employees GROUP BY department;",
            "SELECT department, SUM(salary) FROM employees GROUP BY department;",
            "SELECT department, AVG(salary) FROM employees GROUP BY department;",
            "SELECT department, MIN(salary), MAX(salary) FROM employees GROUP BY department;"
          ],
          questions: [
            "Find the number of employees in each department.",
            "Find the total salary of each department.",
            "Find the average salary of each department.",
            "Find the minimum and maximum salary in each department."
          ],
        }
      ]
    },

    12: {
      title: "HAVING",
      subtitle: "Filtering groups — the WHERE clause for aggregates.",
      // hasExercise: true,

      points: [
          "Why WHERE cannot be used with aggregate functions",
          "HAVING to filter grouped results",
          "The definitive WHERE vs HAVING comparison"
      ],

      blocks: [
        {
          type: "queryTable",
          title: "12.1 - HAVING Basic",
          queryName: "Departments with more than 2 employees",
          code: `SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;`,
          data: dbTables.employees
        },

        {
          type: "summaryTable",
          title: "12.2 - WHERE vs HAVING - The Golden Rule",
          headers: ["", "WHERE", "HAVING"],
          rows: [
            ["Filter", "Individual rows", "Groups (after GROUP BY)"],
            ["Runs", "Before GROUP BY", "After GROUP BY"],
            ["Aggregates?", "No - COUNT/AVG not allowed here", "Yes - purpose-built for them"],
            ["Example", "WHERE salary > 60000", "HAVING AVG(salary) > 60000"]
          ]
        },

        {
          type: "noteRed",
          heading: "Common Mistake:",
          explanation: "Writing WHERE COUNT(*) > 2 throws an error. WHERE runs before aggregation — the COUNT values do not exist yet at that point in execution. Use HAVING."
        },

        {
          type: "noteGreen",
          heading: "Interview Tip",
          explanation: "'What is the difference between WHERE and HAVING?' is asked in almost every data-related SQL interview. Answer: WHERE filters rows before grouping; HAVING filters groups after aggregation."
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 2;",
            "SELECT department, SUM(salary) FROM employees GROUP BY department HAVING SUM(salary) > 150000;",
            "SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 60000;",
            "SELECT department, MAX(salary) FROM employees GROUP BY department HAVING MAX(salary) > 80000;"
          ],
          questions: [
            "Find departments that have more than 2 employees.",
            "Find departments where total salary is greater than 150000.",
            "Find departments where average salary is greater than 60000.",
            "Find departments where the highest salary is greater than 80000."
          ],
        }
      ]
    },

    13: {
      title: "JOINs",
      subtitle: "Aggregating by category — the analytics workhorse.",

      points: [
        "Why JOINs exist and what problem they solve",
        "INNER JOIN — only rows with a match in both tables",
        "LEFT JOIN — all left rows, matched right rows (NULLs where no match)",
        "RIGHT JOIN — the mirror of LEFT JOIN",
        "SELF JOIN — a table joined to itself",
        "Finding rows with no match using LEFT JOIN + IS NULL"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "Two spreadsheets: one with customer names+IDs, another with order amounts+customer IDs. A JOIN merges them so you can see 'Ananya spent ₹1,45,148'. Without JOINs, you would have to manually cross-reference the sheets."
        },

        {
          type: "queryTable",
          title: "13.1 - INNER JOIN",
          subtitle: "Returns rows only where there is a match in BOTH tables. Lisa (no orders) is excluded.",
          queryName: "SQL",
          code: `SELECT c.name, o.order_id, o.total, o.status
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
ORDER BY c.name, o.order_id;`,
          data: dbTables.customers
        },

        {
          type: "queryTable",
          title: "13.2 - LEFT JOIN",
          subtitle: "Returns ALL rows from the left table (customers). Unmatched rows show NULL on the right side.",
          queryName: "SQL",
          code: `SELECT c.name, o.order_id, o.total
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
ORDER BY c.name;`,
          data: dbTables.customers
        },

        {
          type: "queryTable",
          title: "13.3 - Find Customers Who Never Ordered",
          queryName: "Classic LEFT JOIN + IS NULL patter",
          code: `SELECT c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`,
          data: dbTables.customers
        },

        {
          type: "noteGreen",
          heading: "Pro Tips:",
          explanation: "This pattern — LEFT JOIN + WHERE right_side IS NULL — is one of the most frequently used patterns in analytics. 'Users who signed up but never purchased', 'products never sold', 'employees not assigned to any project'."
        },

        {
          type: "queryTable",
          title: "13.4 - SELF JOIN",
          subtitle: "A table joined to itself. Our employees table has manager_id referencing emp_id in the same table: ",
          queryName: "Employees + their manager's name",
          code: `SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id
ORDER BY e.name;`,
          data: dbTables.employees
        },

        {
          type: "note",
          heading: "Engineering Insight:",
          explanation: "INNER JOIN vs LEFT JOIN is a decision, not a preference. Ask yourself: 'Is it valid for a row to have no match?' If yes, use LEFT JOIN. If a row must have a corresponding entry in the other table (by business rules), use INNER JOIN — it will surface data integrity issues."
        },

        {
          type: "multipleTable",
          data: [
            {
              title: "customers",
              data: dbTables.customers
            },
            {
              title: "orders",
              data: dbTables.orders
            }
          ]
        },

        {
          type: "exercise",
          exersiceName: "Tables: Customers",
          defaultQuery: "SELECT * FROM customers;",
          tasks: [
            "SELECT customers.name, orders.total FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;",
            "SELECT customers.name, orders.order_date, orders.status FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;",
            "SELECT customers.name, orders.total FROM customers LEFT JOIN orders ON customers.customer_id = orders.customer_id;",
            "SELECT customers.name, orders.total FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id WHERE orders.total > 50000;",
            "SELECT customers.name, orders.status FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id WHERE orders.status = 'completed';"
          ],
          questions: [
            "Show customer names along with their order totals.",
            "Show customer names, order dates, and order status.",
            "Show all customers and their order totals (including customers with no orders).",
            "Find customers who have placed orders with total greater than 50000.",
            "Find customers who have completed orders."
          ],
        }
      ]
    },

    14: {
      title: "JOINing Three+",
      highlight: "Tables",
      subtitle: "Aggregating by category — the analytics workhorse.",

      points: [
        "Joining three tables in one query",
        "Aliasing tables to keep queries readable",
        "Understanding JOIN order and performance"
      ],

      blocks: [
        {
          type: "queryTable",
          queryName: "Customer names, order dates, and product names in each order",
          code: `SELECT c.name AS customer, o.order_date, p.name AS product, oi.qty,
oi.unit_price
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_date, c.name;`,
          data: dbTables.orders
        },

        {
          type: "noteGreen",
          heading: "Pro Tips:",
          explanation: "Always use short, meaningful table aliases (c for customers, o for orders, p for products). Avoid single letters where they are ambiguous. In a 6-table JOIN, good aliases are the difference between readable code and maintenance hell."
        },

        {
          type: "multipleTable",
          data: [
            {
              title: "Orders",
              data: dbTables.orders
            },
            {
              title: "Customers",
              data: dbTables.customers
            },
            {
              title: "order_items",
              data: dbTables.order_items
            },
            {
              title: "products",
              data: dbTables.products
            },
          ]
        },

        {
            type: "exercise",
            exersiceName: "Table: Orders",
            defaultQuery: "SELECT * FROM orders;",
            tasks: [
              "SELECT customers.name, orders.total FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;",

              "SELECT customers.name, orders.order_date FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;",

              "SELECT customers.name, orders.status FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id WHERE orders.status = 'completed';",

              "SELECT products.name, order_items.qty FROM products INNER JOIN order_items ON products.product_id = order_items.product_id;",

              "SELECT customers.name, SUM(orders.total) FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id GROUP BY customers.name;",

              "SELECT customers.name, COUNT(orders.order_id) FROM customers LEFT JOIN orders ON customers.customer_id = orders.customer_id GROUP BY customers.name;",

              "SELECT products.name, SUM(order_items.qty) FROM products INNER JOIN order_items ON products.product_id = order_items.product_id GROUP BY products.name;",

              "SELECT customers.name, products.name, order_items.qty FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id INNER JOIN order_items ON orders.order_id = order_items.order_id INNER JOIN products ON order_items.product_id = products.product_id;"
            ],
            questions: [
              "Show customer names along with their order totals.",

              "Show customer names and their order dates.",

              "Find customers who have completed orders.",

              "Show product names along with quantity ordered.",

              "Find total amount spent by each customer.",

              "Find number of orders placed by each customer (include customers with no orders).",

              "Find total quantity sold for each product.",

              "Show customer name, product name, and quantity ordered (combine all tables)."
            ],
          }
      ]
    },

    15: {
      title: "Subqueries",
      subtitle: "Queries within queries — nesting for power.",

      points: [
         "Subquery in WHERE to filter on a computed value",
          "Subquery with IN for list-based filtering",
          "Subquery in FROM as a derived table",
          "EXISTS — checking if a subquery returns any rows"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "Subqueries are like asking two questions where the answer to the first feeds the second: 'What is the average salary?' → ₹70,125. 'Who earns more than ₹70,125?' Both steps happen in one SQL statement."
        },

        {
          type: "queryTable",
          title: "15.1 - Subquery in WHERE",
          queryName: "Employees earning above the complany average",
          code: `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "15.2 - Subquery in IN",
          queryName: "Customers who ordered in January 2024",
          code: `SELECT name FROM customers
WHERE customer_id IN (
  SELECT customer_id FROM orders
  WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31'
);`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "15.3 - EXITS",
          subtitle: "EXISTS is faster than IN for large subqueries. It short-circuits as soon as one matching row is found:",
          queryName: "SQL",
          code: `SELECT c.name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);`,
          data: dbTables.employees
        },

        {
          type: "note",
          heading: "Engineering Insight:",
          explanation: "EXISTS vs IN performance: EXISTS stops scanning as soon as it finds the first match. IN collects every matching ID first. On tables with millions of rows, EXISTS can be 10-100x faster. Use EXISTS when you only care 'does a matching row exist?' not 'how many?'"
        },

        {
          type: "multipleTable",
          data: [
            {
              title: "Orders",
              data: dbTables.orders
            },
            {
              title: "Customers",
              data: dbTables.customers
            },
            {
              title: "order_items",
              data: dbTables.order_items
            },
            {
              title: "products",
              data: dbTables.products
            },
          ]
        },

        {
          type: "exercise",
          exersiceName: "Tables: Customers",
          defaultQuery: "SELECT * FROM customers;",

          tasks: [
            "SELECT name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders);",
          
            "SELECT name FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM orders);",
          
            "SELECT name FROM products WHERE product_id IN (SELECT product_id FROM order_items WHERE qty > 1);",
          
            "SELECT name FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE customers.customer_id = orders.customer_id);",
          
            "SELECT name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders GROUP BY customer_id HAVING SUM(total) > 50000);",
          
            "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);"
          ],
          questions: [
            "Find customers who have placed at least one order.",

            "Find customers who have not placed any orders.",

            "Find products that have been ordered with quantity greater than 1.",

            "Find customers who have orders using EXISTS.",

            "Find customers whose total order amount is greater than 50000.",

            "Find products whose price is greater than the average price of all products."
          ],
        }
      ]
    },

    16: {
      title: "CTEs - The",
      highlight: "WITH Clause",
      subtitle: "Named subqueries that make complex logic readable.",

      points: [
        "Defining a CTE with WITH ... AS (...)",
        "Using multiple CTEs in sequence",
        "Recursive CTEs for hierarchical data",
        "CTE vs subquery — when to use each"
      ],

      blocks: [
        {
          type: "queryTable",
          title: "16.1 - Basic CTEs",
          queryName: "Each employee's salary vs their department average",
          code: `WITH dept_avg AS (
    SELECT department, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department
)
SELECT e.name, e.salary, d.avg_sal,
        e.salary - d.avg_sal AS diff
FROM employees e
JOIN dept_avg d ON e.department = d.department
ORDER BY e.department, diff DESC;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "16.2 - Multiple CTEs",
          queryName: "Customer tier classification",
          code: `WITH
order_totals AS (
    SELECT customer_id, COUNT(*) AS orders, SUM(total) AS spent
    FROM orders GROUP BY customer_id
),
customer_tier AS (
    SELECT customer_id, spent,
        CASE WHEN spent > 100000 THEN 'VIP'
            WHEN spent > 10000 THEN 'Regular'
            ELSE 'New' END AS tier
    FROM order_totals
)
SELECT c.name, t.spent, t.tier
FROM customers c
JOIN customer_tier t ON c.customer_id = t.customer_id
ORDER BY t.spent DESC;`,
          data: dbTables.orders
        },

        {
          type: "noteGreen",
          heading: "Pro Tips:",
          explanation: "Rule of thumb: if you need to reference the same subquery twice, use a CTE. If a subquery is used once and is simple, inline it. If it is used 3+ times, consider a view or temp table."
        },

        {
          type: "note",
          heading: "Engineering Insight:",
          explanation: "CTEs do not always improve performance — in some databases they are materialised (computed once and cached), in others they are inlined as subqueries. PostgreSQL inlines by default; you can force materialisation with the MATERIALIZED keyword. Always check your EXPLAIN plan."
        }
      ]
    }
};