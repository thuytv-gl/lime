Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Orders service can handle valid orders
    When I order 1 pieces of item with id 1
    And I wait for 2 seconds
    Then My lastest order have status of "ORDERED"

  Scenario: Orders service can handle when item out of stock
    When I order 200 pieces of item with id 1
    And I wait for 2 seconds
    Then My lastest order have status of "OOF"

  Scenario: Orders service can handle when user's balance is in short
    When I order 50 pieces of item with id 1
    And I wait for 2 seconds
    Then My lastest order have status of "BIS"

