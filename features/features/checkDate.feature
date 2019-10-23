Feature: Check validation
    Scenario Outline:
        Given set scenario: { tag: "CheckDate", testcase: "<testCase>" }
        Then click "textbox" "txtTankaTekiyoDateDisplay"
        Then click "element" "<elememt>"
        Then click "button" "btnApply"
        Given compare message in "errorMessage" with "<message1>"
        Given compare message in "errorMessage" with "<message2>"

        Examples:
            | testCase | elememt     | message1                                      | message2                                  |
            | Saturday | elmSaturday | 単価適用日 に土曜日、日曜日が設定されています | 単価適用日 に土曜日、日曜日が設定されてい |
            | Sunday   | elmSunday   | 単価適用日 に土曜日、日曜日が設定されています | 単価適用日 に土曜曜日が設定されています   |