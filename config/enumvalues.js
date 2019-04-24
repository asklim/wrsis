/* */

  const staffRole = { 
    DA : {  
               id : 'DA',  
             name : 'Document Accounting',  
      description : 'Документарный Учет'  
    },  
    GC : {  
               id : 'GC', 
             name : 'General Contact',  
      description : 'Общий (Bosss)' 
    },  
    OM : {  
               id : 'OM',  
             name : 'Orders Manager', 
      description : 'Менеджер по заказам'  
    },  
    SP : {  
               id : 'SP',  
             name : 'Sale Person',
      description : 'Продавец на торговом месте' 
    }  
  };
 
  const staffStatus = {  
    A : {   
               id : 'A',  
             name : 'Actual',   
      description : 'В найме'   
    },  
    DC2BL : {  
               id : 'DC2BL',  
             name : 'Discharge to BlackList',  
      description : 'Уволен навсегда'  
    },  
    DC2R : {  
               id : 'DA',  
             name : 'Discharge to Reserve',  
      description : 'Уволен в запас'  
    },  
    WL : {  
               id : 'DA',  
             name : 'Waiting List',  
      description : 'В листе ожидания' 
    }  
 };
 
export {
  staffRole,
  staffStatus
};
