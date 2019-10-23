Feature: Check validation
  Scenario Outline:
    Given set scenario: { tag: "Login", testcase: "<testCase>" }
    Given browse to web site "http://132.145.113.198/imsl/login?"
    When clear textbox "txtUsername"
    When input textbox "txtUsername" value "<username>"
    When clear textbox "txtPassword"
    When input textbox "txtPassword" value "<password>"
    Then click "button" "btnLogin"

    Examples:
      | testCase       | username | password |
      | LoginWithDev08 |          |          |
      | LoginWithDev08 | dev08    | tindev   |


