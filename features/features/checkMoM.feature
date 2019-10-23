@CheckMoM
Feature: Check validation case MoM

    @CheckMoM Login
    Scenario: CheckMoM Login
        Given browse to web site "http://132.145.113.198/imsl/login?"
        When clear textbox "txtUsername"
        When input textbox "txtUsername" value "dev08"
        When clear textbox "txtPassword"
        When input textbox "txtPassword" value "dev08"
        Then click "button" "btnLogin"
        Then click "button" "btnGoToImportApp"
    
    @CheckMoM when no click checkbox
    Scenario: CheckMoM when no click checkbox
        Then click "button" "btnApply"

    @CheckMoM when only click checkbox
    Scenario: CheckMoM when only click checkbox
        Then click "checkbox" "chbMoM"
        Then click "button" "btnApply"

    @CheckMoM when click checkbox and input text
    Scenario: CheckMoM when click checkbox and input text
        When clear textbox "txtMoM"
        When input textbox "txtMoM" value "tinitnti"
        Then click "button" "btnApply"