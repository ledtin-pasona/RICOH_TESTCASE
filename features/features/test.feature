@Test
Feature: Test examples

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



    Scenario:
        Given browse to web site "http://132.145.113.198/imsl/forma/normal/view/regist_application_view/sf_nim008_apl001?"
        Then delay "3"s to find element "btnTab2"
        Then click "button" "btnTab2"
    Scenario:
        Then click "button" "btnSaleCom"
