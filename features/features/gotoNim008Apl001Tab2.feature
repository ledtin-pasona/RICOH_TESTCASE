Feature: Go to Nim008_apl001_tab2
    Scenario:
        Given browse to web site "http://132.145.113.198/imsl/forma/normal/view/regist_application_view/sf_nim008_apl001?"
        Then delay "3"s to find element "btnTab2"
        Then click "button" "btnTab2"