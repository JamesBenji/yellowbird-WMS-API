"use strict";
/**
 * purpose:
 * 1. Clearing a picking list. For auditing, used to confirm is the items on the picking list have been packed.
 * 2. Requires photo of the packaged goods with WarehouseStockOutLabel.
 * 3. generates WarehouseStockOutLabel
 * input: PickingList
 * collection: STOCK_OUT
 * dto: WarehouseStockOutLabel, PickingList,
 * rules:
 * 1. each client merchant stock is uniquely tracked in a document
 * 2. doc creation in PUT_AWAY collection triggers the tracking of inventory
 */ 
