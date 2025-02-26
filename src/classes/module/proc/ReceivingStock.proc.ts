
/**
 * input: uuid for incoming stock notification
 * output: saves received products data
 * rules:
 * 1. Receives the notification uuid, and returns a list of items expected (API)
 * 2. Receives a payload specifying the items received at the warehouse dock (API)
 * 3. Assigns each product an sku while linking it to the stock batchNo and stock ownerId (internal).
 * 4. Saves the received products data in Firestore (Firebase: RECEIVED_INVENTORY)
 * 
 * END: The PutAway module is triggered into action by a collection listener.
 */