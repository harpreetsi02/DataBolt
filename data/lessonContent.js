import { headers } from "next/headers";
import { dbTables } from "./dbTables";

export const lessonContent = {
  1: {
    title: "What is",
    highlight: "SQL?",
    subtitle: "And why is it one of the most valuable skills you can learn in tech?",

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

      points: [
        "Filtering rows with a single condition",
        "All comparison operators: =, !=, >, <, >=, <=",
        "Filtering numbers, text, and dates"
      ],

      blocks: [
        {
          type: "noteBlue",
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

      points: [
        "COUNT — how many rows (with and without NULLs)",
        "SUM, AVG — totals and averages",
        "MIN, MAX — extremes",
        "Combining multiple aggregates "
      ],

      blocks: [
        {
          type: "noteBlue",
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
      title: "INNER",
      highlight: "JOINs",
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
          title: "13.2 - INNER JOIN (Customers with High Orders)",
          subtitle: "Find customers and their order details only for orders greater than 3000. This shows how INNER JOIN works with filtering conditions.",
          queryName: "SQL",
          code: `SELECT c.name, o.order_id, o.total
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
WHERE o.total > 3000;`,
          data: dbTables.customers
        },

        {
          type: "noteGreen",
          heading: "Pro Tip:",
          explanation: "This is commonly used in business to identify high-value customers."
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
            `SELECT c.name, o.order_id
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id;`,

            `SELECT c.name, o.total
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id;`,

            `SELECT c.name, o.total
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
WHERE o.total > 5000;`,

            `SELECT c.name, o.order_id
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
WHERE o.status = 'completed';`,

            `SELECT c.name, o.total
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
ORDER BY o.total DESC;`,

            `SELECT c.name, COUNT(o.order_id) AS total_orders
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

            `SELECT c.name, SUM(o.total) AS total_spent
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

            `SELECT c.name, COUNT(o.order_id) AS orders_count
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name
HAVING COUNT(o.order_id) > 1;`,

            `SELECT c.name, MAX(o.order_date) AS last_order
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

            `SELECT c.name, AVG(o.total) AS avg_order
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

            `SELECT c.name, o.order_id, oi.qty
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id;`,

            `SELECT c.name, p.name, oi.qty
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;`,

            `SELECT p.name, SUM(oi.qty) AS total_qty
FROM products p
INNER JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.name;`,

            `SELECT DISTINCT c.name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE p.category = 'Electronics';`,

            `SELECT c.name, MAX(o.total) AS highest_order
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`
          ],
          questions: [
            "Get customer names with their order IDs",
            "Show order totals with customer names",
            "Orders above 5000",
            "Only completed orders",
            "Sort by order amount",
            "Count orders per customer",
            "Total spending per customer",
            "Customers with more than 1 order",
            "Latest order date per customer",
            "Average order value per customer",
            "Join 3 tables (customers + orders + order_items)",
            "Product names with customer orders",
            "Total quantity ordered per product",
            "Customers who bought Electronics",
            "Highest order per customer"
          ],
        }
      ]
    },

    14: {
      title: "LEFT",
      highlight: "JOINs",
      subtitle: "Keeping all left table rows — even when there is no match.",

      points: [
        "LEFT JOIN returns ALL rows from the left table",
        "Matching rows from the right table are included",
        "If no match is found, NULL values are returned",
        "Useful to find missing relationships (e.g., customers with no orders)",
        "LEFT JOIN + IS NULL helps detect unmatched records"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "You have a list of all customers and a list of orders. A LEFT JOIN ensures every customer appears — even if they never placed an order. Missing orders will show as NULL."
        },
      
        {
          type: "queryTable",
          title: "14.1 - LEFT JOIN",
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
          title: "14.2 - Find Customers Who Never Ordered",
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
          type: "noteGreen",
          heading: "Pro Tip:",
          explanation: "LEFT JOIN + IS NULL is widely used to find missing data — like users who never logged in, customers with no orders, or products that were never sold."
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
              `SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id;`,

              `SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id;`,

              `SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
WHERE o.total > 5000;`,

              `SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
WHERE o.status = 'completed';`,

              `SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
ORDER BY o.total DESC;`,

              `SELECT c.name, COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

              `SELECT c.name, SUM(o.total) AS total_spent
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

              `SELECT c.name, COUNT(o.order_id) AS orders_count
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name
HAVING COUNT(o.order_id) > 1;`,

              `SELECT c.name, MAX(o.order_date) AS last_order
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

              `SELECT c.name, AVG(o.total) AS avg_order
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
GROUP BY c.name;`,

              `SELECT c.name
FROM customers c
LEFT JOIN orders o
ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`,

              `SELECT c.name, o.order_id, oi.qty
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id;`,

              `SELECT c.name, p.name, oi.qty
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.product_id;`,

              `SELECT p.name, SUM(oi.qty) AS total_qty
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.name;`,

              `SELECT DISTINCT c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.product_id
WHERE p.category = 'Electronics';`
            ],

            questions: [
              "Get all customers with their order IDs (include customers with no orders)",
              "Show order totals with customer names (include NULLs for no orders)",
              "Orders above 5000 (note: customers without orders will be excluded due to WHERE)",
              "Only completed orders (note: behaves like INNER JOIN due to filtering)",
              "Sort customers by order amount",
              "Count orders per customer (including 0 orders)",
              "Total spending per customer (NULL becomes 0 in understanding)",
              "Customers with more than 1 order",
              "Latest order date per customer",
              "Average order value per customer",
              "Find customers who have NOT placed any orders",
              "Join 3 tables using LEFT JOIN",
              "Product names with customer orders (including NULLs)",
              "Total quantity ordered per product (including unsold products)",
              "Customers who bought Electronics (LEFT JOIN + filter)"
            ]
        }
      ]
    },

    15: {
      title: "RIGHT",
      highlight: "JOINs",
      subtitle: "Keeping all right table rows — even when there is no match.",

      points: [
        "RIGHT JOIN returns ALL rows from the right table",
        "Matching rows from the left table are included",
        "If no match is found, NULL values are returned",
        "In SQLite, RIGHT JOIN is not supported directly",
        "We simulate RIGHT JOIN using LEFT JOIN by reversing table order"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "You want all orders, even if some customers are missing. RIGHT JOIN keeps all rows from the right table (orders). In SQLite, we achieve this by reversing the tables and using LEFT JOIN."
        },
      
        {
          type: "queryTable",
          title: "15.1 - RIGHT JOIN (Simulated)",
          subtitle: "Returns all orders, including those that may not have matching customers (simulated using LEFT JOIN).",
          queryName: "SQL",
          code: `SELECT o.order_id, c.name, o.total
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
ORDER BY o.order_id;`,
          data: dbTables.orders
        },
      
        {
          type: "queryTable",
          title: "15.2 - RIGHT JOIN (Orders without Customers)",
          subtitle: "Find orders that do NOT have matching customers using LEFT JOIN + IS NULL.",
          queryName: "SQL",
          code: `SELECT o.order_id
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL;`,
          data: dbTables.orders
        },
      
        {
          type: "noteGreen",
          heading: "Pro Tip:",
          explanation: "RIGHT JOIN is rarely used in practice. Most developers prefer LEFT JOIN because it is more readable and widely supported."
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
          exersiceName: "Tables: Orders",
          defaultQuery: "SELECT * FROM orders;",
          tasks: [
            `SELECT o.order_id, c.name
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id;`,

            `SELECT o.order_id, o.total
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id;`,

            `SELECT o.order_id, o.total
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
WHERE o.total > 5000;`,

            `SELECT o.order_id, c.name
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
WHERE o.status = 'completed';`,

            `SELECT o.order_id, o.total
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
ORDER BY o.total DESC;`,

            `SELECT o.order_id, COUNT(c.customer_id) AS match_count
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
GROUP BY o.order_id;`,

            `SELECT o.order_id, SUM(o.total) AS total_value
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
GROUP BY o.order_id;`,

            `SELECT o.order_id, COUNT(c.customer_id) AS count_match
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
GROUP BY o.order_id
HAVING COUNT(c.customer_id) > 0;`,

            `SELECT o.order_id, MAX(o.order_date) AS latest
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
GROUP BY o.order_id;`,

            `SELECT o.order_id, AVG(o.total) AS avg_value
FROM orders o
LEFT JOIN customers c
ON c.customer_id = o.customer_id
GROUP BY o.order_id;`,

            `SELECT o.order_id, oi.qty
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id;`,

            `SELECT o.order_id, p.name
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.product_id;`,

            `SELECT p.name, COUNT(o.order_id)
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.order_id
GROUP BY p.name;`,

            `SELECT DISTINCT o.order_id
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.product_id
WHERE p.category = 'Electronics';`
          ],

          questions: [
           "Get all orders with customer names (include missing customers)",
           "Show order totals with orders",
           "Orders above 5000",
           "Only completed orders",
           "Sort orders by amount",
           "Count matches per order",
           "Total value per order",
           "Orders with at least one matching customer",
           "Latest date per order",
           "Average value per order",
           "Join orders with order_items",
           "Get product names per order",
           "Count orders per product",
           "Orders that include Electronics products"
         ]
        }
      ]     
    },

    16: {
      title: "SELF",
      highlight: "JOINs",
      subtitle: "Joining a table to itself — useful for hierarchical relationships.",

      points: [
        "SELF JOIN is used to join a table with itself",
        "Useful for hierarchical data (like employees and managers)",
        "We use aliases to differentiate the same table",
        "Each alias acts like a separate table",
        "Common in real-world scenarios like org charts and reporting structure"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "Imagine an employees table where each employee has a manager_id. To find who manages whom, we join the employees table with itself — one side is the employee, the other is the manager."
        },
      
        {
          type: "queryTable",
          title: "16.1 - SELF JOIN (Employee & Manager)",
          subtitle: "Shows each employee along with their manager name.",
          queryName: "SQL",
          code: `SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id;`,
          data: dbTables.employees
        },
      
        {
          type: "queryTable",
          title: "16.2 - SELF JOIN",
          subtitle: "A table joined to itself. Our employees table has manager_id referencing emp_id in the same table: ",
          queryName: "Employees + their manager's name",
          code: `SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.emp_id
ORDER BY e.name;`,
          data: dbTables.employees
        },

        {
          type: "noteGreen",
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
          exersiceName: "Tables: Employees",
          defaultQuery: "SELECT * FROM employees;",

          tasks: [
            `SELECT e.name, m.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id;`,

          `SELECT e.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
WHERE e.manager_id IS NULL;`,

          `SELECT e.name, m.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
WHERE m.name = 'Vikram';`,

          `SELECT e.name, m.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
ORDER BY m.name;`,

          `SELECT m.name, COUNT(e.emp_id)
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
GROUP BY m.name;`,

          `SELECT m.name, SUM(e.salary)
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
GROUP BY m.name;`,

          `SELECT e.name, m.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
WHERE e.salary > 70000;`,

          `SELECT e.name, m.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
WHERE e.department = 'IT';`,

          `SELECT e.name, m.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
WHERE m.department = 'Sales';`,

          `SELECT e.name, m.name
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id
WHERE e.hire_date > '2021-01-01';`
          ],

          questions: [
            "Get employee names with their managers",
            "Find employees who do not have a manager",
            "Find employees managed by Vikram",
            "Sort employees by manager name",
            "Count employees under each manager",
            "Total salary under each manager",
            "Employees with salary > 70000 and their managers",
            "Employees from IT department with their managers",
            "Employees whose managers are from Sales department",
            "Employees hired after 2021 with their managers"
          ]
        }
      ]
    },

    17: {
      title: "UNION",
      highlight: "SELECT",
      subtitle: "Combining results from multiple queries into a single result set.",

      points: [
        "UNION is used to combine results of two or more SELECT queries",
        "Each SELECT must have the same number of columns",
        "Column data types must be compatible",
        "UNION removes duplicate rows by default",
        "Use UNION ALL to include duplicates"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "You have two lists — one of customers and one of employees. UNION merges them into a single list. It’s like stacking results on top of each other."
        },
      
        {
          type: "queryTable",
          title: "17.1 - UNION",
          subtitle: "Combine customer names and employee names into one list (duplicates removed).",
          queryName: "SQL",
          code: `SELECT name FROM customers
UNION
SELECT name FROM employees;`,
          data: dbTables.customers
        },
      
        {
          type: "queryTable",
          title: "17.2 - UNION ALL",
          subtitle: "Combine results including duplicates.",
          queryName: "SQL",
          code: `SELECT name FROM customers
UNION ALL
SELECT name FROM employees;`,
          data: dbTables.customers
        },
      
        {
          type: "noteGreen",
          heading: "Pro Tip:",
          explanation: "Use UNION when you want unique results. Use UNION ALL when performance matters and duplicates are allowed."
        },
      
        {
          type: "exercise",
          exersiceName: "Tables: Customers & Employees",
          defaultQuery: "SELECT * FROM customers;",
    
          tasks: [
          `SELECT name FROM customers
UNION
SELECT name FROM employees;`,

          `SELECT name FROM customers
UNION ALL
SELECT name FROM employees;`,

          `SELECT city FROM customers
UNION
SELECT department FROM employees;`,

          `SELECT country FROM customers
UNION
SELECT department FROM employees;`,

          `SELECT name FROM customers
WHERE country = 'India'
UNION
SELECT name FROM employees
WHERE department = 'IT';`,

          `SELECT name FROM customers
UNION
SELECT name FROM employees
ORDER BY name;`,

          `SELECT name FROM customers
UNION ALL
SELECT name FROM employees
ORDER BY name;`,

          `SELECT name FROM customers
UNION
SELECT name FROM customers;`,

          `SELECT name FROM employees
UNION
SELECT name FROM employees;`,

          `SELECT name FROM customers
UNION ALL
SELECT name FROM customers;`
          ],
        
          questions: [
            "Combine customer and employee names (unique values)",
            "Combine customer and employee names (include duplicates)",
            "Combine cities and departments",
            "Combine countries and departments",
            "Combine filtered results from two tables",
            "Sort combined results",
            "Sort combined results including duplicates",
            "Remove duplicates from same table using UNION",
            "Remove duplicates from employees",
            "Keep duplicates using UNION ALL"
          ]
        }
      ]
    },

    18: {
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

    19: {
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
            `SELECT name, price
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
);`,
          
            "SELECT name FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM orders);",
          
            "SELECT name FROM products WHERE product_id IN (SELECT product_id FROM order_items WHERE qty > 1);",
          
            "SELECT name FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE customers.customer_id = orders.customer_id);",
          
            "SELECT name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders GROUP BY customer_id HAVING SUM(total) > 50000);",
          
            "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);"
          ],
          questions: [
            "Get the name and price of products whose price is greater than the average price of all products.",

            "Find customers who have not placed any orders.",

            "Find products that have been ordered with quantity greater than 1.",

            "Find customers who have orders using EXISTS.",

            "Find customers whose total order amount is greater than 50000.",

            "Find products whose price is greater than the average price of all products."
          ],
        }
      ]
    },

    20: {
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
            "WITH order_totals AS (SELECT customer_id, SUM(total) AS total_spent FROM orders GROUP BY customer_id) SELECT * FROM order_totals;",

            "WITH high_value_orders AS (SELECT * FROM orders WHERE total > 50000) SELECT order_id, customer_id, total FROM high_value_orders;",

            "WITH customer_orders AS (SELECT customer_id, COUNT(order_id) AS total_orders FROM orders GROUP BY customer_id) SELECT customers.name, customer_orders.total_orders FROM customers LEFT JOIN customer_orders ON customers.customer_id = customer_orders.customer_id;",

            "WITH avg_price AS (SELECT AVG(price) AS avg_p FROM products) SELECT name, price FROM products WHERE price > (SELECT avg_p FROM avg_price);",

            "WITH order_summary AS (SELECT customer_id, SUM(total) AS total_spent FROM orders GROUP BY customer_id), high_spenders AS (SELECT customer_id FROM order_summary WHERE total_spent > 50000) SELECT customers.name FROM customers INNER JOIN high_spenders ON customers.customer_id = high_spenders.customer_id;"
          ],
          questions: [
            "Create a CTE to calculate total spending per customer.",

            "Create a CTE for orders where total is greater than 50000 and display them.",

            "Create a CTE to count total orders per customer and show customer names with their order count.",

            "Create a CTE to calculate average product price and find products priced above average.",

            "Use multiple CTEs to find customers who have spent more than 50000 in total."
          ],
        }
      ]
    },

    21: {
      title: "CASE",
      highlight: "Statements",
      subtitle: "If-else logic that lives inside your SQL.",

      points: [
          "CASE WHEN ... THEN ... END syntax",
          "Using CASE to label and categorise rows",
          "CASE inside aggregate functions — the pivot pattern"
      ],

      blocks: [
        {
          type: "queryTable",
          title: "17.1 - Basic Case",
          queryName: "Label employees by salary band",
          code: `SELECT name, salary,
    CASE
        WHEN salary < 60000 THEN 'Junior'
        WHEN salary < 75000 THEN 'Mid-Level'
        ELSE 'Senior'
    END AS band
FROM employees ORDER BY salary;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "17.2 - CASE in Aggregates (The Pivot Pattern)",
          queryName: "Count by band in one row",
          code: `SELECT
    SUM(CASE WHEN salary < 60000 THEN 1 ELSE 0 END) AS junior,
    SUM(CASE WHEN salary BETWEEN 60000 AND 74999 THEN 1 ELSE 0 END)
AS mid,
    SUM(CASE WHEN salary >= 75000 THEN 1 ELSE 0 END) AS senior
FROM employees;`,
          data: dbTables.employees
        },

        {
          type: "noteGreen",
          heading: "Interview Tip:",
          explanation: " This SUM(CASE WHEN ... END) pattern is the standard way to pivot rows into columns in SQL. It appears in almost every data analyst/data engineer interview. Know it cold."
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT name, salary, CASE WHEN salary > 70000 THEN 'High' ELSE 'Low' END AS salary_level FROM employees;",

            "SELECT name, department, CASE WHEN department = 'IT' THEN 'Tech' ELSE 'Non-Tech' END AS dept_type FROM employees;",

            "SELECT name, salary, CASE WHEN salary < 60000 THEN 'Low' WHEN salary BETWEEN 60000 AND 80000 THEN 'Medium' ELSE 'High' END AS salary_category FROM employees;",

            "SELECT name, manager_id, CASE WHEN manager_id IS NULL THEN 'No Manager' ELSE 'Has Manager' END AS manager_status FROM employees;",

            "SELECT name, department, salary, CASE WHEN department = 'IT' AND salary > 70000 THEN 'Top IT' WHEN department = 'HR' THEN 'HR Team' ELSE 'Other' END AS category FROM employees;"
          ],
          questions: [
            "Classify employees as 'High' or 'Low' based on salary greater than 70000.",

            "Classify employees as 'Tech' or 'Non-Tech' based on department.",

            "Categorize employees into 'Low', 'Medium', and 'High' salary groups.",

            "Show whether an employee has a manager or not.",

            "Create a custom category: 'Top IT' for IT employees with salary > 70000, 'HR Team' for HR, and 'Other' for rest."
          ],
        }
      ]
    },

    22: {
      title: "Window",
      highlight: "Functions",
      subtitle: "The feature that separates intermediate from advanced SQL.",

      points: [
        "How window functions differ from GROUP BY",
        "ROW_NUMBER, RANK, DENSE_RANK",
        "The Top-N-per-group pattern — used everywhere",
        "Running totals with SUM() OVER",
        "LAG and LEAD — looking backward and forward",
        "NTILE for percentile buckets"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "GROUP BY puts everyone in separate rooms and gives you a summary per room. Window functions keep everyone in the same room, but give each person their own name tag showing their rank, their group's average, and how they compare. You get the detail AND the summary."
        },

        {
          type: "query",
          heading: "Syntax",
          code: `function_name() OVER (
    PARTITION BY column   -- divide rows into groups (optional)
    ORDER BY column       -- order within each group
    ROWS/RANGE ...        -- window frame (advanced, optional)
)`
        },

        {
          type: "queryTable",
          title: "18.1 -  ROW_NUMBER per Department",
          queryName: "SQL",
          code: `SELECT name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC)
AS rank_in_dept
FROM employees
ORDER BY department, rank_in_dept;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "18.2 -  Top Earner per Department",
          queryName: "The Top-N-per-group pattern — learn this by heart",
          code: `WITH ranked AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary
DESC) AS rn
    FROM employees
)
SELECT name, department, salary
FROM ranked
WHERE rn = 1;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "18.2 -  Top Earner per Department",
          queryName: "The Top-N-per-group pattern — learn this by heart",
          code: `WITH ranked AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary
DESC) AS rn
    FROM employees
)
SELECT name, department, salary
FROM ranked
WHERE rn = 1;`,
          data: dbTables.employees
        },

        {
          type: "summaryTable",
          title: "18.3 - RANK vs DENSE_RANK",
          headers: ["Function", "Tie behaviour", "Sequence: 100, 90, 90, 80"],
          rows: [
            ["ROW_NUMBER()", "Arbitary", "1, 2, 3, 4"],
            ["RANK()", "Same rank, skip next", "1, 2, 2, 4 (3 is skipped)"],
            ["DENSE_RANK()", "Same rank, no skip", "1, 2, 2, 3 (consecutive)"]
          ]
        },

        {
          type: "queryTable",
          title: "18.4 -  Running Total",
          queryName: "SQL",
          code: `SELECT order_id, order_date, total,
    SUM(total) OVER (ORDER BY order_date) AS running_total
FROM orders;`,
          data: dbTables.employees
        },

        {
          type: "queryTable",
          title: "18.5 -  LAG & LEAD",
          queryName: "Each order vs previous and next order",
          code: `SELECT order_id, total,
    LAG(total) OVER (ORDER BY order_date) AS prev_total,
    LEAD(total) OVER (ORDER BY order_date) AS next_total
FROM orders;`,
          data: dbTables.employees
        },

        {
          type: "note",
          heading: "Engineering Insight:",
          explanation: "Window functions were designed specifically for analytics workloads. Netflix uses them for viewing streak calculations, Uber for surge pricing windows, Swiggy for peak-hour analysis. Every data engineering role at a FAANG-level company expects fluency with window functions."
        },

        {
          type: "noteGreen",
          heading: "Interview Tip:",
          explanation: "'Write a query to find the second highest salary in each department' is a top-5 SQL interview question at Amazon, Microsoft and Google. The answer: ROW_NUMBER() or DENSE_RANK() inside a CTE."
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees",
          tasks: [
            "SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM employees;",

            "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rank_num FROM employees;",

            "SELECT name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank FROM employees;",

            "SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank FROM employees;",

            "SELECT name, salary, AVG(salary) OVER () AS avg_salary FROM employees;"
          ],
          questions: [
            "Assign a row number to each employee based on salary (highest first).",

            "Rank employees based on salary (highest first).",

            "Assign row numbers within each department based on salary (highest first).",

            "Rank employees within each department based on salary.",

            "Show each employee's salary along with the average salary of all employees."
          ],
        }
      ]
    },

    23: {
      title: "String",
      highlight: "Functions",
      subtitle: "Manipulating and transforming text data.",

      points: [
          "UPPER, LOWER, TRIM — basic cleanup",
          "CONCAT — combining strings",
          "SUBSTRING, LEFT, RIGHT — extracting parts",
          "REPLACE, INSTR — search and replace"
      ],

      blocks: [
        {
          type: "summaryTable",
          headers: ["Function", "What It Does", "Example → Output"],
          rows: [
            ["UPPER(str)", "Convert to uppercase", "UPPER('sql book') → 'SQL BOOK'"],
            ["LOWER(str)", "Convert to lowercase", "LOWER('SQL') → 'sql'"],
            ["TRIM(str)", "Remove leading + trailing spaces", "TRIM(' hi ') → 'hi'"],
            ["LENGTH(str)", "Number of characters", "LENGTH('Arjun') → 5"],
            ["CONCAT(s1,s2,...)", "Join strings", "CONCAT('Hello','SQL') → 'Hello SQL'"],
            ["LEFT(str,n)", "First n characters", "LEFT('Bangalore',4) → 'Bang'"],
            ["RIGHT(str,n)", "Last n characters", "RIGHT('Bangalore',4) → 'lore'"],
            ["SUBSTRING(s,pos,n)", "Extract n chars from position", "SUBSTRING('Hyderabad',2,5) → 'yderi'"],
            ["REPLACE(s,old,new)", "Replace all occurrences", "REPLACE('SQL is hard','hard','easy')"],
            ["INSTR(str,sub)", "Position of substring", "INSTR('Hyderabad','bad') → 7"]
          ]
        },

        {
          type: "queryTable",
          title: "Real Examples",
          queryName: "Full display string with city",
          code: `SELECT CONCAT(name, ' — ', city, ', ', country) AS profile
FROM customers;`,
          data: dbTables.customers
        },

        {
          type: "multipleTable",
          data: [
            {
              title: "Employees",
              data: dbTables.employees
            },
            {
              title: "Customers",
              data: dbTables.customers
            }
          ]
        },

        {
          type: "exercise",
          exersiceName: "Tables: Employees & Customers",
          tasks: [
            "SELECT name, UPPER(name) AS upper_name FROM employees;",

            "SELECT name, LOWER(name) AS lower_name FROM customers;",

            "SELECT name, LENGTH(name) AS name_length FROM employees;",

            "SELECT name, CONCAT(name, ' - ', department) AS full_info FROM employees;",

            "SELECT name, SUBSTRING(city, 1, 3) AS short_city FROM customers;"
          ],
          questions: [
            "Convert all employee names to uppercase.",

            "Convert all customer names to lowercase.",

            "Find the length of each employee's name.",

            "Combine employee name and department into a single column.",

            "Extract first 3 characters of each customer's city."
          ],
        }
      ]
    },

    24: {
      title: "Data & Time",
      highlight: "Functions",
      subtitle: "Working with dates - extraction, arithmetic, formatting.",

      points: [
          "Getting current date and time",
          "Extracting year, month, day from a date",
          "Calculating differences between dates",
          "Adding and subtracting intervals",
          "Filtering by date ranges"
      ],

      blocks: [
        {
          type: "summaryTable",
          headers: ["Function", "Returns", "Example"],
          rows: [
            ["NOW()", "Current date + time", "2024-03-29 14:30:00"],
            ["CURDATE()", "Current date only", "2024-03-29"],
            ["YEAR(date)", "Year integer", "YEAR('2024-03-29') → 2024"],
            ["MONTH(date)", "Month integer", "MONTH('2024-03-29') → 3"],
            ["DAY(date)", "Day integer", "DAY('2024-03-29') → 29"],
            ["MONTHNAME(date)", "Month name", "MONTHNAME('2024-03-29') → March"],
            ["DAYNAME(date)", "Weekday name", "DAYNAME('2024-03-29') → Friday"],
            ["DATEDIFF(d1,d2)", "Days between dates", "DATEDIFF('2024-12-31','2024-01-01') → 365"],
            ["TIMESTAMPDIFF(unit,d1,d2)", "Difference in any unit", "TIMESTAMPDIFF(YEAR, dob, CURDATE())"],
            ["DATE_ADD(date, INTERVAL n)", "Add to a date", "DATE_ADD('2024-01-01', INTERVAL 30 DAY)"],
            ["DATE_SUB(date, INTERVAL n)", "Subtract from a date", "DATE_SUB(CURDATE(), INTERVAL 90 DAY)"]
          ]
        },

        {
          type: "query",
          heading: "Example",
          queryName: "Order from the last 90 days",
          code: `SELECT order_id, order_date, total
FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY);`
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees (Date Functions)",
          tasks: [
            "SELECT name, YEAR(hire_date) AS join_year FROM employees;",
          
            "SELECT name, MONTH(hire_date) AS join_month FROM employees;",
          
            "SELECT name, MONTHNAME(hire_date) AS monthname FROM employees;",
          
            "SELECT name, DATE_ADD(hire_date, INTERVAL 7 DAY) AS new_date FROM employees;",
          
            "SELECT name, DATEDIFF(CURDATE(), hire_date) AS days_worked FROM employees;"
          ],
          questions: [
            "Show each employee's name along with the year they were hired.",
          
            "Display the month number in which each employee was hired.",
          
            "Display the month name in which each employee was hired.",
          
            "Add 7 days to each employee's hire date and display the new date.",
          
            "Calculate how many days each employee has worked till today."
          ]
        }
      ]
    },

    25: {
      title: "INSERT, UPDATE,",
      highlight: "DELETE",
      subtitle: "Modifying data — the right way, safely.",

      points: [
          "adding single and multiple rows",
          "UPDATE — modifying existing data with WHERE",
          "DELETE — removing rows safely",
          "The golden rule: always test with SELECT first"
      ],

      blocks: [
        {
          type: "query",
          heading: "21.1 - INSERT",
          queryName: "SQL",
          code: `INSERT INTO employees (name, department, salary, hire_date)
VALUES ('Nisha', 'IT', 71000, '2024-03-01');
-- Multiple rows at once
INSERT INTO employees (name, department, salary, hire_date) VALUES
    ('Akash', 'Sales', 58000, '2024-04-01'),
    ('Pooja', 'HR', 62000, '2024-04-15');`
        },

        {
          type: "query",
          heading: "21.2 - UPDATE",
          queryName: "10% raise for all IT employees",
          code: `UPDATE employees
SET salary = salary * 1.10
WHERE department = 'IT';`
        },

        {
          type: "note",
          heading: "Watch Out:",
          explanation: "Always include a WHERE clause in UPDATE. 'UPDATE employees SET salary = salary * 1.10' with no WHERE gives everyone a raise — not just IT. This is called a 'fat finger' mistake and it has caused real production incidents at major companies."
        },

        {
          type: "query",
          heading: "21.3 - DELETE",
          queryName: "SQL",
          code: `-- Safe workflow: SELECT first, then DELETE
SELECT * FROM employees WHERE salary < 50000;        -- verify what
will be deleted
DELETE FROM employees WHERE salary < 50000;          -- then delete`
        },

        {
          type: "noteGreen",
          heading: "Pro Tips:",
          explanation: "Wrap destructive operations in a transaction: START TRANSACTION; DELETE ...; ROLLBACK; — verify, then COMMIT when satisfied. This is standard practice at any serious engineering team."
        },

        {
          type: "exercise",
          exersiceName: "Table: Employees (Insert, Update, Delete)",
          tasks: [
            "INSERT INTO employees VALUES (9, 'Rohit', 'IT', 75000, 1, '2024-01-10');",
          
            "UPDATE employees SET salary = 80000 WHERE name = 'Priya';",
          
            "UPDATE employees SET department = 'Marketing' WHERE emp_id = 3;",
          
            "DELETE FROM employees WHERE emp_id = 8;",
          
            "INSERT INTO employees (emp_id, name, department, salary, manager_id, hire_date) VALUES (10, 'Neha', 'HR', 62000, 4, '2023-12-01');",
          
            "DELETE FROM employees WHERE department = 'HR';"
          ],
          questions: [
            "Insert a new employee Rohit into the table.",
          
            "Update Priya's salary to 80000.",
          
            "Change Rahul's department to Marketing.",
          
            "Delete the employee with emp_id 8.",
          
            "Insert a new employee Neha using column names.",
          
            "Delete all employees from HR department."
          ]
        }
      ]
    },

    26: {
      title: "CREATE TABLE",
      highlight: "& DDL",
      subtitle: "Designing and modifying database structure.",

      points: [
          "CREATE TABLE with all constraint types",
          "PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, DEFAULT, CHECK",
          "ALTER TABLE — adding, modifying, dropping columns",
          "DROP TABLE — remove a table entirely"
      ],

      blocks: [
        {
          type: "query",
          queryName: "Creating our employees table from scratch",
          code: `CREATE TABLE employees (
    emp_id        INT PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(100)    NOT NULL,
    department    VARCHAR(50)     NOT NULL,
    salary        DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    manager_id    INT,
    hire_date     DATE            NOT NULL,
    CONSTRAINT chk_salary CHECK (salary >= 0),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);`
        },

        {
          type: "summaryTable",
          title: "Constraints Reference",
          headers: ["Constraint", "Purpose"],
          rows: [
            ["PRIMARY KEY", "Unique + NOT NULL identifier for every row"],
            ["NOT NULL", "Column cannot be omitted or set to NULL"],
            ["UNIQUE", "All values in this column must be different across rows"],
            ["DEFAULT", "Value used automatically when INSERT omits this column"],
            ["CHECK(condition)", "INSERT/UPDATE fails if condition evaluates to false"],
            ["FOREIGN KEY", "Value must exist in the referenced table (referential integrity)"],
            ["AUTO_INCREMENT", "Database automatically assigns the next integer value"]
          ]
        },

        {
          type: "query",
          heading: "ALTER TABLE",
          queryName: "SQL",
          code: `ALTER TABLE employees ADD COLUMN phone VARCHAR(15);
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12,2) NOT NULL;
ALTER TABLE employees DROP COLUMN phone;
ALTER TABLE employees RENAME COLUMN department TO dept;`
        },
      ]
    },

    27: {
      title: "Indexes &",
      highlight: "Performance",
      subtitle: "The single most impactful performance tool available to you.",

      points: [
          "What an index is and how it works internally",
          "When to add indexes and when not to",
          "Composite indexes and column order",
          "Using EXPLAIN to verify index usage"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "An index on a database column is like the index at the back of a textbook. Without it, to find every mention of 'GROUP BY' you read every page (full table scan). With an index, you jump directly to page 78. The bigger the book, the more dramatic the difference."
        },

        {
          type: "query",
          queryName: "SQL",
          code: `-- Create a standard index
CREATE INDEX idx_department ON employees(department);
-- Composite index (order matters — most selective column first)
CREATE INDEX idx_dept_salary ON employees(department, salary);
-- Unique index (also enforces data integrity)
CREATE UNIQUE INDEX idx_email ON customers(email);
-- Check if index is being used
EXPLAIN SELECT * FROM employees WHERE department = 'IT';`
        },

        {
          type: "summaryTable",
          title: "Index Rules",
          headers: ["Rule", "Explanation"],
          rows: [
            ["Index WHERE columns", "Columns in WHERE clauses benefit most from indexes"],
            ["Index JOIN ON columns", "Foreign key columns used in JOINs should always be indexed"],
            ["Index ORDER BY columns", "Indexes can serve ORDER BY and avoid a sort operation"],
            ["Composite index order", "Put the most selective column first (e.g., dept, salary)"],
            ["Do not over-index", "Every index slows INSERT/UPDATE/DELETE. Index only what you query"],
            ["EXPLAIN is your friend", "Look for type='ALL' (bad) vs 'ref' or 'eq_ref' (good, index used)"]
          ]
        },

        {
          type: "note",
          heading: "Engineering Insight:",
          explanation: "At Facebook's scale, adding or removing a single index on a hot table is treated as a high-risk migration requiring a review by a database reliability engineer. A missing index on a 50-billion-row table means queries take minutes instead of milliseconds."
        }
      ]
    },

    28: {
      title: "Transactions &",
      highlight: "ACID",
      subtitle: "Data integrity — guaranteeing your data is always correct.",

      points: [
          "What a transaction is and why it matters",
          "START TRANSACTION, COMMIT, ROLLBACK",
          "ACID: Atomicity, Consistency, Isolation, Durability",
          "SAVEPOINT for partial rollbacks"
      ],

      blocks: [
        {
          type: "noteBlue",
          heading: "Think of it this way:",
          explanation: "A bank transfer: deduct ₹5,000 from Account A, add ₹5,000 to Account B. If the server crashes after the deduction but before the credit, the money disappears. A transaction guarantees either BOTH operations succeed or NEITHER does — the money cannot vanish."
        },

        {
          type: "query",
          queryName: "Safe money transfer",
          code:  `START TRANSACTION;
UPDATE accounts SET balance = balance - 5000 WHERE account_id =
101;
UPDATE accounts SET balance = balance + 5000 WHERE account_id =
202;
COMMIT; -- only if both succeed
-- If anything fails:
ROLLBACK; -- reverts both updates completely`
        },

        {
          type: "summaryTable",
          headers: ["Property", "Guarantee", "Bank Transfer Example"],
          rows: [
            ["Atomicity", "All changes commit or none do", "Debit + credit both happen or neither"],
            ["Consistency", "DB remains valid before and after", "Total money in system stays the same"],
            ["Isolation", "Concurrent transactions do not interfere", "Two simultaneous transfers do not corrupt each other"],
            ["Durability", "Committed data survives crashes", "After COMMIT, data is on disk even if power cuts"]
          ]
        }
      ]
    },

    29: {
      title: "SQL Execution",
      highlight: "Order",
      subtitle: "The secret that explains 80% of SQL errors.",

      points: [
          "The actual order SQL clauses execute (it is not what you write)",
          "Why you cannot use SELECT aliases in WHERE",
          "Why aggregate functions are forbidden in WHERE",
          "How to write queries with this knowledge"
      ],

      blocks: [
        {
          type: "summaryTable",
          subtitle: "You write SQL in this order: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT",
          queryName: "But SQL excute in this order:",
          headers: ["Execution Step", "Clause", "What happens"],
          rows: [
            ["1", "FROM", "Identify the source table(s)"],
            ["2", "JOIN", "Combine joined tables"],
            ["3", "WHERE", "Filter individual rows"],
            ["4", "GROUP BY", "Group remaining rows"],
            ["5", "HAVING", "Filter groups"],
            ["6", "SELECT", "Compute output columns and aliases"],
            ["7", "DISTINCT", "Remove duplicate rows"],
            ["8", "ORDER BY", "Sort the result"],
            ["9", "LIMIT", "Restrict row count"]
          ]
        },

        {
          type: "query",
          heading: "The Practical Implications",
          queryName: "These FAIL - and now you know why",
          code: `-- FAILS: WHERE runs before SELECT, alias 'annual' doesn't exist
yet
SELECT salary * 12 AS annual FROM employees WHERE annual > 100000;
-- FAILS: WHERE cannot use aggregate functions
SELECT department FROM employees WHERE COUNT(*) > 2;
-- FAILS: HAVING is not available without GROUP BY in most dialects
SELECT name FROM employees HAVING salary > 70000;`
        },

        {
          type: "query",
          queryName: "These FAIL - and now you know why",
          code: `-- Use the expression directly in WHERE
SELECT salary * 12 AS annual FROM employees WHERE salary * 12 >
100000;
-- Use HAVING for aggregate filters
SELECT department FROM employees GROUP BY department HAVING
COUNT(*) > 2;
-- Alias is fine in ORDER BY (runs after SELECT)
SELECT salary * 12 AS annual FROM employees ORDER BY annual DESC;`
        },

        {
          type: "noteGreen",
          heading: "Interview Tips:",
          explanation: "Why can't I use a SELECT alias in a WHERE clause?' is a common interview screening question. It filters candidates who have merely memorised syntax from those who understand how SQL actually executes."
        }
      ]
    },

    30: {
      title: "50 Practice",
      highlight: "Problems",
      subtitle: "Build real query muscle — from beginner to FAANG-ready.",

      points: [
          "Section A (Q1 - 15): Beginner - single table, basic filters",
          "Section B (Q16 - 35): Intermediate — JOINs, GROUP BY, subqueries",
          "Section C (Q36 - 50): Advanced — window functions, CTEs, analytics"
      ],

      blocks: [
        {
          type: "noteBlue",
          subtitle: "All problems use our five tables: employees, products, customers, orders, order_items.",
          heading: "Note",
          explanation: "Attempt each question before looking at the Answer Key. Struggling and figuring out the answer yourself is 10x more effective than reading the solution directly."
        },

        {
          type: "multipleTable",
          data: [
            {
              title: "Employees",
              data: dbTables.employees
            },
            {
              title: "Order Items",
              data: dbTables.order_items
            },
            {
              title: "Orders",
              data: dbTables.orders
            },
            {
              title: "Products",
              data: dbTables.products
            },
            {
              title: "Customers",
              data: dbTables.customers
            },
          ]
        },

        {
          type: "exercise",
          exersiceName: "Table: (Employees, Order Items, Orders, Products, Customers)",
          tasks: [

            // Section A - Beginner (Q1 - Q15)
            "SELECT name, department, salary FROM employees;", //01
            "SELECT name, hire_date FROM employees;", //02
            "SELECT * FROM employees WHERE department = 'Sales';", //03
            "SELECT name, price FROM products WHERE price < 1000;", //04
            "SELECT * FROM customers WHERE country = 'India';", //05
            "SELECT name, hire_date FROM employees WHERE hire_date > '2022-01-01';", //06
            "SELECT DISTINCT category FROM products;", //07
            "SELECT * FROM orders WHERE status = 'pending';", //08
            "SELECT name FROM employees WHERE name LIKE 'A%';", //09
            "SELECT name, stock FROM products WHERE stock = 0;", //10
            "SELECT name, salary FROM employees ORDER BY salary DESC;", //11
            "SELECT name, price FROM products ORDER BY price DESC LIMIT 3;", //12
            "SELECT name, salary FROM employees WHERE salary BETWEEN 60000 AND 80000;", //13
            "SELECT name, department FROM employees WHERE department != 'IT';", //14                    
            "SELECT name, manager_id FROM employees WHERE manager_id IS NOT NULL;", //15

            // Section B - Intermediate (Q16 - Q35)
            "SELECT department, COUNT(*) AS headcount FROM employees GROUP BY department ORDER BY headcount DESC;", //16
            "SELECT department, ROUND(AVG(salary), 2) AS avg_salary FROM employees GROUP BY department ORDER BY avg_salary DESC;", //17
                    
            "SELECT department, SUM(salary) AS total_payroll FROM employees GROUP BY department ORDER BY total_payroll DESC LIMIT 1;", //18
                    
            "SELECT c.name, COUNT(o.order_id) AS order_count FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name ORDER BY order_count DESC;", //19
                    
            "SELECT SUM(total) AS completed_revenue FROM orders WHERE status = 'completed';", //20/
                    
            "SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id ORDER BY e.name;", //21
                    
            "SELECT DISTINCT c.name FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id;", //22
                    
            "SELECT c.name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;",//23
                    
            "SELECT c.name, o.order_id, o.order_date, o.total, o.status FROM orders o JOIN customers c ON o.customer_id = c.customer_id ORDER BY o.order_date;", //24
                    
            `SELECT c.name AS customer, o.order_date, p.name AS product, oi.qty,
oi.unit_price
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_date;`, //25 
                    
            `SELECT DISTINCT p.name
FROM products p
INNER JOIN order_items oi ON p.product_id = oi.product_id;`, //26
                    
            `SELECT p.name
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL;`, //27
                    
            `SELECT c.name, SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC;`, //28
                    
            `SELECT MONTHNAME(order_date) AS month, SUM(total) AS revenue
FROM orders
WHERE YEAR(order_date) = 2024
GROUP BY MONTH(order_date), MONTHNAME(order_date)
ORDER BY revenue DESC
LIMIT 1;`, //29

            `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;`, //30
                    
            `WITH dept_avg AS (
 SELECT department, AVG(salary) AS avg_sal
 FROM employees
 GROUP BY department
)
SELECT e.name, e.department, e.salary, d.avg_sal
FROM employees e
JOIN dept_avg d ON e.department = d.department
WHERE e.salary > d.avg_sal;`,  //31
                    
            `SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;`, //32
                    
            `WITH ranked AS (
 SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
 FROM employees
)
SELECT DISTINCT salary AS second_highest
FROM ranked WHERE rnk = 2;`, //33 with two type solution
                    
            `SELECT c.name, o.order_id, o.order_date, o.total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE YEAR(o.order_date) = 2024
 AND MONTH(o.order_date) = 1
 AND c.country = 'India';`, //34
                    
            `SELECT customer_id
FROM orders
WHERE YEAR(order_date) = 2024 AND MONTH(order_date) = 1
AND customer_id IN (
 SELECT customer_id FROM orders
 WHERE YEAR(order_date) = 2024 AND MONTH(order_date) = 2
);`, //35

            // Section C - Advanced (Q36 - Q50)
            `SELECT name, department, salary,
 RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS
dept_rank
FROM employees
ORDER BY department, dept_rank;`, //36
                    
            `WITH ranked AS (
 SELECT *,
 ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary
DESC) AS rn
 FROM employees
)
SELECT name, department, salary FROM ranked WHERE rn = 1;`, //37
                    
            `SELECT order_id, order_date, total,
 SUM(total) OVER (ORDER BY order_date
 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
 ) AS running_total
FROM orders;`, //38
                    
            `SELECT order_id, order_date, total,
 LAG(total, 1, 0) OVER (ORDER BY order_date) AS prev_total
FROM orders;`, //39
                    
            `WITH monthly AS (
 SELECT MONTH(order_date) AS mo, MONTHNAME(order_date) AS
month_name,
 SUM(total) AS revenue
 FROM orders WHERE YEAR(order_date) = 2024
 GROUP BY MONTH(order_date), MONTHNAME(order_date)
)
SELECT month_name, revenue,
 revenue - LAG(revenue) OVER (ORDER BY mo) AS abs_change,
 ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY mo))
 / LAG(revenue) OVER (ORDER BY mo), 1) AS pct_change
FROM monthly ORDER BY mo;`, //40
                    
            `SELECT order_id, total,
 ROUND(100.0 * total / SUM(total) OVER (), 2) AS pct_of_total
FROM orders
ORDER BY pct_of_total DESC;`, //41
                    
            `WITH totals AS (
 SELECT customer_id, SUM(total) AS spent FROM orders GROUP BY
customer_id
)
SELECT c.name, t.spent,
 CASE WHEN t.spent > 100000 THEN 'VIP'
 WHEN t.spent > 10000 THEN 'Regular'
 ELSE 'New'
 END AS tier
FROM customers c
JOIN totals t ON c.customer_id = t.customer_id
ORDER BY t.spent DESC;`, //42
                    
            `SELECT p.name, SUM(oi.qty * oi.unit_price) AS revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name
ORDER BY revenue DESC
LIMIT 1;`, //43
                    
            `WITH RECURSIVE hierarchy AS (
 SELECT emp_id, name, manager_id, 1 AS level, name AS path
 FROM employees WHERE manager_id IS NULL

 UNION ALL

 SELECT e.emp_id, e.name, e.manager_id,
 h.level + 1, CONCAT(h.path, ' → ', e.name)
 FROM employees e
 JOIN hierarchy h ON e.manager_id = h.emp_id
)
SELECT name, level, path FROM hierarchy ORDER BY path;`, //44
                    
            `SELECT p.category,
 SUM(oi.qty * oi.unit_price) AS revenue,
 ROUND(100.0 * SUM(oi.qty * oi.unit_price) / SUM(SUM(oi.qty *
oi.unit_price)) OVER (), 1) AS pct
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.category
ORDER BY revenue DESC;`, //45
                    
            `SELECT name, salary,
 NTILE(4) OVER (ORDER BY salary) AS quartile,
 NTILE(100) OVER (ORDER BY salary) AS percentile
FROM employees
ORDER BY salary;`, //46
                    
            `WITH monthly AS (
 SELECT MONTH(order_date) AS mo, SUM(total) AS revenue
 FROM orders WHERE YEAR(order_date) = 2024
 GROUP BY MONTH(order_date)
)
SELECT mo, revenue,
 ROUND(AVG(revenue) OVER (
 ORDER BY mo
 ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
 ), 2) AS moving_avg_3m
FROM monthly ORDER BY mo;`, //47
                    
            `SELECT DAYNAME(order_date) AS day_of_week,
 COUNT(*) AS order_count
FROM orders
GROUP BY DAYOFWEEK(order_date), DAYNAME(order_date)
ORDER BY order_count DESC
LIMIT 1;`, //48
                    
            `SELECT order_id, customer_id, order_date,
 ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date)
AS order_sequence
FROM orders
ORDER BY customer_id, order_date;`, //49
                    
            `SELECT
 c.name,
 COUNT(o.order_id) AS total_orders,
 COALESCE(SUM(o.total), 0) AS total_spent,
 ROUND(AVG(o.total), 2) AS avg_order_value,
 MIN(o.order_date) AS first_order,
 MAX(o.order_date) AS last_order,
 DATEDIFF(CURDATE(), MIN(o.order_date)) AS days_since_first,
 DATEDIFF(CURDATE(), MAX(o.order_date)) AS days_since_last
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC;`, //50
          ],
          questions: [
            // Section A — Beginner
            "List all employees with their department and salary.", //01
            "Show only the name and hire_date of every employee.", //02
            "Find all employees in the 'Sales' department.", //03
            "List all products with price under ₹1,000.", //04
            "Find all customers from India.", //05
            "Show employees hired after 2022-01-01.", //06
            "List all distinct product categories.", //07
            "Find orders with status = 'pending'.", //08
            "Find employees whose name starts with 'A'.", //09
            "Find products that are out of stock (stock = 0).", //10
            "List all employees sorted by salary — highest first.", //11
            "Show the top 3 most expensive products.", //12
            "Find employees with salary between ₹60,000 and ₹80,000.", //13
            "List employees NOT in the 'IT' department.", //14
            "Find employees who have a manager (manager_id is not null).", //15

            // Section B — Intermediate
            "Count how many employees are in each department.", //16
            "What is the average salary per department, ordered highest first?", //17
            "Which department has the highest total payroll?", //18
            "How many orders has each customer placed? (include customers with 0 orders)", //19
            "What is the total revenue from all completed orders?", //20
            "Show each employee's name and their manager's name.", //21
            "Which customers have placed at least one order?", //22
            "Which customers have NEVER placed an order?", //23
            "Show each order with the customer name.", //24
            "List each order item with customer name, product name, qty, unit price.", //25
            "Find products that have been ordered at least once.", //26
            "Find products that have NEVER been ordered.", //27
            "Show total revenue per customer, highest first.", //28
            "Which month had the highest revenue in 2024?", //29
            "Find employees earning more than the overall average salary.", //30
            "Find employees earning more than their own department average.", //31
            "Show departments with more than 2 employees.", //32
            "Get the 2nd highest salary in the company.", //33
            "List all January 2024 orders placed by Indian customers.", //34
            "Find customers who placed orders in both January AND February 2024.", //35

            // Section C — Advanced
            "Rank employees within each department by salary (highest = rank 1).", //36
            "Show only the top earner per department.", //37
            "Show a running cumulative total of order amounts by date.", //38
            "For each order, show the previous order's total (LAG).", //39
            "Calculate month-over-month revenue change (absolute + % change) for 2024.", //40
            "Show each order's total as a percentage of the company's total revenue.", //41
            "Label each customer as VIP (>₹1,00,000), Regular (>₹10,000), or New.", //42
            "Find which product has generated the most total revenue.", //43
            "Show all employees with their full hierarchy level (recursive CTE).", //44
            "Show product category revenue and each category's % share of total.", //45
            "For each employee, show their salary rank within the company (NTILE quartile).", //46
            "Show the 3-month moving average of monthly revenue.", //47
            "Find which day of the week has the most orders.", //48
            "Show each order with a 'streak number' — consecutive orders by the same customer.", //49
            "Build a complete customer health report: name, total orders, total spent, avg order value, days since first order, days since last order." //50
          ]
        }
      ]
    }
};