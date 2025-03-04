

/**
 * purpose:
 * 1. handles product return notifications
 * 2. handles returned product stock receiving, and put-away
 * input: returned product details from merchant
 * collection: RETURNS
 * dto: PRODUCT
 * rules:
 * 1. each client merchant stock is uniquely tracked in a document
 * 2. doc creation in PUT_AWAY collection triggers the tracking of inventory
 */

export class Returns {
    constructor() {
        
    }
}