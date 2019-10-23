@TestScenarioOutline
Feature: TestScenarioOutline
    This is a sample TestScenarioOutline

    @TestScenarioOutline test
    Scenario Outline: TestScenarioOutline test
        When add number 1 "<num1>" and number 2 "<num2>"
        Then get total

        Examples:
            | num1 | num2 |
            | 1    | 2    |
            | 3    | 4    |

    @TestScenarioOutline test1
    Scenario Outline: TestScenarioOutline1 test
        When add number 1 "<num1>" and number 2 "<num2>"
        Then get total

        Examples:
            | num1 | num2 |
            | 5    | 6    |
            | 7    | 8    |