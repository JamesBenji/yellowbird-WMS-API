
/**
 * payload: IncomingStock dto
 * operations: 
 *  1. receive POST data from request
 *  2. save the data in FireStore
 *  END
 * 
 * The listeners on the Firestore collection will trigger other processes, namely: 
 * - notifying the warehouse manager about incoming stock
 */

import { IncomingStockInterface } from "../../../dto/IncomingStock.dto";

class IncomingStock {
    data: IncomingStockInterface;

    constructor(data: IncomingStockInterface) {
        this.data = data        
    }

    saveIncomingStockData () {
        
    }

}