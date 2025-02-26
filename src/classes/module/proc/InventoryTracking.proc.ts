
/**
 * purpose:
 * 1. monitors changes in the number of products 
 * 2. triggers low-stock level notifications to client merchant (uses Notification module)
 * input: Firestore PutAway collection onCreate triggers for a given client merchant 
 * collection: INVENTORY_TRACKING
 * dto: 
 * rules:
 * 1. each client merchant stock is uniquely tracked in a document
 * 2. doc creation in PUT_AWAY collection triggers the tracking of inventory
 */