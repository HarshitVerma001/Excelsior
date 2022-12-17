
# **Title: Excelsior**


## **1. Methodology**

1. Value is inserted in the cell
2. Value can be cut, copied or pasted
3. Formula is written by user in the formula bar for evaluation
4. Formula is evaluated by extracting the parent and child cells
5. This creates a dependency graph which tells the order of value updation
6. Implement cycle detection algorithm using DFS to detect the cycle incase it is present
7. User can save the current work on website using local storage provided by the browser
8. If sheet is saved by user, then next time all the values and formulas will be added to blank sheet when opened

### Formatting :

→ Multiple Formatting Features to give the data the looks you desire.

- Font Style and Font Size.

- Alignment inlcuding left align, right align and center.

- Bold, Italic and Underline the texts.

- Custom Background Color and Text Color.

### Address Bar and Formula Bar :

→ Address Bar and Formula Bar are added in this clone to provide better functionality and user experience.

- Address Bar provides the user the address of the cell on which user is currently working on.

- Formula Bar provides the user access to evaluate ALL BASIC MATHEMATICAL operations on one or more cells.



## **2. Description**
A completely offline JavaScript-based SpreadSheet program. It has been written with pure(stock) JS. No additional 3rd party API or framework/library has been used. I have commented on every major logic's code block in this program.

It is designed in a way that it can automatically create 2600 cells(A-Z Columns and 1-100 Rows) and give a unique ID to each cell. Then this IDs have been used in the cell reference feature. It supports calculation from direct expression and cell reference and also supports all basic excel formulas(including 'if' formula). It supports value auto-update(re-calculation of all expressions whenever the user changes referenced data.)

By default, this program automatically generates A-Z columns and 1-100 rows (2600 cells), but you can change it from inside the code. It also supports cell reference (eg '=a1+5' here a1 is referencing cell A1 ). It also supports formulas, I have tried to include all common formulas. So you will find most formulas predefined. But you can also create your own functions/formulas using native JavaScript code. In fact, not only formulas but also variables, arrays, objects, and almost anything can be created and used later.


## **3. Input / Output**
1. Case 1
* Input - Value is added with no formula
* Output - Value is shown in the cell

2. Case 2
* Input - Formula is added with no value
* Output - The formula is evaluated and corresponding cells gets updated

3. Case 3
* Input - Value and formula both are added
* Output - First, the value is shown in the cells. Then, formula is evaluated on these new values and corresponding cells gets updated

## **4. Live link**
Link: https://harshitverma001.github.io/Excelsior


## **5. Screenshot of the Interface**
![image](https://user-images.githubusercontent.com/57209062/208232299-1d8bf05f-d240-4f7c-bb83-dd523545f047.png)
![image](https://user-images.githubusercontent.com/57209062/208232313-8ed9d224-8063-49ae-a4d5-6bf35e321e42.png)
![image](https://user-images.githubusercontent.com/57209062/208232365-44a57153-c98b-4737-97cb-e3a4b4355996.png)
![image](https://user-images.githubusercontent.com/57209062/208232375-fc5557b4-86ba-4b4f-a4b9-6cc6dc09364f.png)
![image](https://user-images.githubusercontent.com/57209062/208232448-2520f271-23f0-4fcd-b7f4-7c27e433a798.png)
![image](https://user-images.githubusercontent.com/57209062/208232663-1c7ab773-e497-4410-9277-b1dfb0d2ad74.png)
![image](https://user-images.githubusercontent.com/57209062/208232698-9e79af2f-f866-4856-858d-209e1ff2761d.png)



