Feature: Order Capturing Servcie can handle many scenarios
  I want to know is it true or not

  Scenario: Orders service can handle valid orders
    Given Inventory have item 1 with data "inventory/item-1.json"
    Given Account have user 1 with balance of 100
    When I order 1 pieces of item with id 1
    And I wait for 2 seconds
    Then My lastest order have status of "ORDERED"

  Scenario: Orders service can handle when item out of stock
    Given Inventory have item 1 with data "inventory/item-1.json"
    Given Account have user 1 with balance of 100
    When I order 200 pieces of item with id 1
    And I wait for 2 seconds
    Then My lastest order have status of "OOF"

  Scenario: Orders service can handle when user's balance is in short
    Given Inventory have item 1 with data "inventory/item-1.json"
    Given Account have user 1 with balance of 100
    When I order 50 pieces of item with id 1
    And I wait for 2 seconds
    Then My lastest order have status of "BIS"

