import sys
from random import randint
import time
import json

if __name__ == '__main__':


    data_output = {"object" : [{"ticker" : "ticker_A", "trade_ON" : 1, "data" : [1.5990022420883179, 1.5987977981567383, 1.6075878143310547, 1.6048015356063843, 1.6068129539489746, 1.6097097396850586, 1.606787085533142, 1.6008964776992798, 1.5981078147888184, 1.6025898456573486, 1.5908114910125732, 1.5918244123458862, 1.6168148517608643, 1.6149089336395264, 1.6111880540847778],"time" : []}, 
                              {"ticker" : "ticker_B", "trade_ON" : 1, "data" :  [7.995011210441589, 7.993988990783691, 8.037939071655273, 8.024007678031921, 8.034064769744873, 8.048548698425293, 8.03393542766571, 8.004482388496399, 7.990539073944092, 8.012949228286743, 7.954057455062866, 7.959122061729431, 8.084074258804321, 8.074544668197632, 8.05594027042389],"time" : []},
                              {"ticker" : "ticker_C", "trade_ON" : 1, "data" : [25.568081702034675, 25.561543993908344, 25.843385807856976, 25.75387968684609, 25.818478689782296, 25.91165446036939, 25.81764738236089, 25.628695323099606, 25.53948587689092, 25.682942134040445, 25.306811999376464, 25.33904959740326, 26.140902648745055, 26.07930863948752, 25.95926945625493],"time" : []},
                              {"ticker" : "ticker_D", "trade_ON" : 1, "data" : [40.883419967450735, 40.86774025494726, 41.545512105766996, 41.32986566927268, 41.48546600999774, 41.7102425562104, 41.48346239282601, 41.028888070778166, 40.814851965548044, 41.1592222706185, 40.25836732950295, 40.335317734789705, 42.26499964092592, 42.115708505050875, 41.82526484068579],"time" : []},
                              ]
                    }
    
    fetch_data = 0

    while(True):


        if(sys.argv[1] != 0): #potentially set a condition to stop a specific stock to fetch data => fetch_data = 1!!!

            st = sys.argv[1]
            start_value = 0
            test_var = 144
            test_var2 = "impressive"
            #print (" lets print some info : {}, and  {}, as well as  {}".format(st.capitalize(), test_var,test_var2))

            print(randint(-40, -20))
            sys.stdout.flush()

            sys.argv[1] = 0 #prevent to re_enter the loop that took inputs
        
        if(fetch_data == 0): #we stay in the while loop as long as needed
            
            #rand_number = randint(0, 10)
            #print(randint(-20, 20))
            for i in  range(0,len(data_output['object'])):
                #data_output['object'][i]['data'][-1] = randint(0, 10)
                last_value = data_output['object'][i]['data'][-1]
                data_output['object'][i]['data'].append(last_value + last_value*0.05*randint(-1, 1))

            my_json = json.dumps(data_output)
            print(my_json)
            sys.stdout.flush()

            time.sleep(5)



    








