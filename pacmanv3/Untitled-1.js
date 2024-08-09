
    if(typeof window.cardano == 'undefined' || 
    typeof window.cardano.nami == 'undefined') 
    {
        
        if (typeof window.cardano == 'undefined' || typeof window.cardano.eternl == 'undefined') {
            
             if (typeof window.cardano == 'undefined' || typeof window.cardano.lace == 'undefined') {
                
            }
            else
            {
                const walletHandleLace= await window.cardano.lace.enable(); 
                
                wallet = "Lace : ";
                
                networkType_ = await walletHandleLace.getNetworkId(); 
				j.log({networkType_});
                
                walletAPI = await new Cip30Wallet(walletHandleLace); 
				
            }  
        }
        else
        {
            const walletHandleEternl = await window.cardano.eternl.enable(); 
            
            wallet = "Eternl : ";
            
            networkType_ = await walletHandleEternl.getNetworkId(); j.log({networkType_});
            
            walletAPI = await new Cip30Wallet(walletHandleEternl); j.log({walletAPI});
        }
    }
    else
    {
        const walletHandleNami = await window.cardano.nami.enable(); 
        
        wallet = "Nami : ";
        
        networkType_ = await walletHandleNami.getNetworkId(); j.log({networkType_});
        
        walletAPI = await new Cip30Wallet(walletHandleNami); j.log({walletAPI});

    }
      if (networkType_ == 1) {
          alert("Sorry this dApp is for testing. Change network to preprod. Open Nami wallet, then click the icon, select settings, then chose network and finally select preprod")
          
      } else {
          network = "Preprod/Preview";
      }
      
      if(wallet !="")
      {

          const walletHelper = new WalletHelper(walletAPI); 
		  j.log({walletHelper});
    
          const utxos = await walletHelper.pickUtxos(new Value(BigInt(10_000_000)));  j.log({utxos}); 
          
          const utxosZeroElement = utxos[0];  j.log({utxosZeroElement});
          
          const txId = utxos[0][0].txId.hex; j.log({txId});
          
          let utxoCounter = 1;

		  j.log({utxoCounter});
		

		  let utxoConter = "dead";

		  j.log({utxoConter});
		  
		  let utxoCouter = false;

		  j.log({utxoCouter});

		  function add(x,y,z)
		  {
			//...
			return x + y + z;
		  }

		  const addAns = add(2,3,4);
		  
		  j.test("checkWallet","add",addAns).eq(9)

          const allAddresses = await walletHelper.allAddresses;  j.log({allAddresses});
          
          const unusedAddresses = await walletAPI.unusedAddresses; j.log({unusedAddresses}) ;
          
          const baseAddress = (await walletHelper.baseAddress).toBech32(); 

		  if(baseAddress)
		  {
			localStorage.setItem("user",baseAddress);
		  }
		  
		  j.log({baseAddress});
               
          const balanceLovelace = (await walletHelper.calcBalance()).lovelace; 
          
          const balanceAda = (await walletHelper.calcBalance()).lovelace/BigInt(1000000); j.log({balanceAda});
          
           
          const collateralAda = (await walletHelper.pickCollateral()).value.lovelace/BigInt(1000000); j.log({collateralAda}) ;
          
          const shortAddress = baseAddress.slice(0,10) +"..."+ baseAddress.substr(baseAddress.length - 5);
          
          document.getElementById("notif").innerHTML = 
		  "<h1 style='background-color:blue;width:100%;padding:5px;text-align:center;'>"+
		   "<span style='color:lightgreen'>Wallet : </span>"+ wallet + 
		   ", <span style='color:lightgreen'>Balance :</span> " + balanceAda.toString() +
           " tADA <br> <span style='color:lightgreen'>Address : </span> "+ shortAddress + 
		   " <span style='color:lightgreen'>Network</span> : "+network+"</h1>";
      
		  
		}
      else
      {
         document.getElementById("notif").innerHTML = "<span style='color:red;'>Cardano wallet was not found on this browser. "+
         "Add Nami/Eternl/Lace to this browser, enable it and set it to Preprod network. Thank you.</span>"; 
      }
      j.e("checkWallet"); 
      jtrics()