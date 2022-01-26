// noinspection ES6PreferShortImport

import { keccak256 } from '@ethersproject/solidity'
import { INIT_CODE_HASHES } from './constants'

const mumbaiBytecode =
  '0x60806040526001600f553480156200001657600080fd5b50604051469062000027906200045a565b604051908190039020620000436001600160e01b03620000c916565b805160209182012060408051808201825260018152603160f81b90840152516200009593927fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69186913091016200049d565b60408051601f19818403018152919052805160209091012060035550600580546001600160a01b03191633179055620005a7565b6060620000de6001600160e01b036200011816565b620000f16001600160e01b036200016e16565b6040516020016200010492919062000467565b604051602081830303815290604052905090565b6008546040516060916001600160a01b0316906200016890829062000149906395d89b4160e01b906020016200042e565b60408051601f198184030181529190526001600160e01b036200019f16565b91505090565b6009546040516060916001600160a01b0316906200016890829062000149906395d89b4160e01b906020016200042e565b606060006060846001600160a01b031684604051620001bf919062000445565b600060405180830381855afa9150503d8060008114620001fc576040519150601f19603f3d011682016040523d82523d6000602084013e62000201565b606091505b509150915081801562000215575060008151115b156200023b5780806020019051620002319190810190620002b2565b9250505062000250565b60405180602001604052806000815250925050505b92915050565b600082601f8301126200026857600080fd5b81516200027f62000279826200051a565b620004f3565b915080825260208301602083018583830111156200029c57600080fd5b620002a983828462000574565b50505092915050565b600060208284031215620002c557600080fd5b81516001600160401b03811115620002dc57600080fd5b620002ea8482850162000256565b949350505050565b620002fd816200054b565b82525050565b620002fd8162000558565b620002fd6200031d826200055b565b62000558565b6000620003308262000542565b6200033c818562000546565b93506200034e81856020860162000574565b9290920192915050565b60006200036760528362000546565b7f454950373132446f6d61696e28737472696e67206e616d652c737472696e672081527f76657273696f6e2c75696e7432353620636861696e49642c6164647265737320602082015271766572696679696e67436f6e74726163742960701b604082015260520192915050565b6000620003e360018362000546565b605f60f81b815260010192915050565b60006200040260138362000546565b7f446f6c6f6d697465204c5020546f6b656e3a2000000000000000000000000000815260130192915050565b60006200043c82846200030e565b50600401919050565b600062000453828462000323565b9392505050565b6000620002508262000358565b60006200047482620003f3565b915062000482828562000323565b91506200048f82620003d4565b9150620002ea828462000323565b60a08101620004ad828862000303565b620004bc602083018762000303565b620004cb604083018662000303565b620004da606083018562000303565b620004e96080830184620002f2565b9695505050505050565b6040518181016001600160401b03811182821017156200051257600080fd5b604052919050565b60006001600160401b038211156200053157600080fd5b506020601f91909101601f19160190565b5190565b919050565b6000620002508262000568565b90565b6001600160e01b03191690565b6001600160a01b031690565b60005b838110156200059157818101518382015260200162000577565b83811115620005a1576000848401525b50505050565b61411680620005b76000396000f3fe608060405234801561001057600080fd5b50600436106102415760003560e01c80636a62784211610145578063b432a82c116100bd578063d21220a71161008c578063dd62ed3e11610071578063dd62ed3e14610442578063e29d390e14610455578063fff6cae91461045d57610241565b8063d21220a714610427578063d505accf1461042f57610241565b8063b432a82c146103fc578063ba9a7a5614610404578063c0c53b8b1461040c578063c45a01551461041f57610241565b8063763548571161011457806395d89b41116100f957806395d89b41146103c05780639dc29fac146103c8578063a9059cbb146103e957610241565b806376354857146103a55780637ecebe00146103ad57610241565b80636a627842146103605780636b818e181461037357806370a082311461038a5780637464fc3d1461039d57610241565b8063313ce567116101d8578063448f7065116101a75780635a3d54931161018c5780635a3d5493146103485780635cbe0192146103505780635cebb0451461035857610241565b8063448f7065146103205780635909c0d51461034057610241565b8063313ce567146102e65780633644e515146102fb5780633f165227146103035780634101d9531461030b57610241565b806323b872dd1161021457806323b872dd146102ae5780632580aeca146102c15780632d28b749146102c957806330adf81f146102de57610241565b806306fdde0314610246578063095ea7b3146102645780630dfe16811461028457806318160ddd14610299575b600080fd5b61024e610465565b60405161025b9190613dc3565b60405180910390f35b6102776102723660046136e1565b61049c565b60405161025b9190613cca565b61028c6104b3565b60405161025b9190613cbc565b6102a16104c2565b60405161025b9190613cd8565b6102776102bc366004613602565b6104c8565b61024e610581565b6102dc6102d73660046136e1565b6105e2565b005b6102a161085b565b6102ee61087f565b60405161025b9190613eb2565b6102a1610884565b6102a161088a565b610313610896565b60405161025b9190613e60565b61033361032e3660046137dc565b6108ae565b60405161025b9190613df4565b6102a16111d6565b6102a16111dc565b61024e6111e2565b610313611229565b6102a161036e366004613537565b611255565b61037b611579565b60405161025b93929190613e38565b6102a1610398366004613537565b6115ce565b6102a16115e0565b61028c6115e6565b6102a16103bb366004613537565b6115f5565b61024e611607565b6103db6103d63660046136e1565b61162a565b60405161025b929190613e7c565b6102776103f73660046136e1565b611b23565b61037b611b30565b6102a1611d73565b6102dc61041a3660046135b5565b611d79565b61028c612154565b61028c612163565b6102dc61043d366004613645565b612172565b6102a161045036600461357b565b61235c565b61028c612379565b6102dc612388565b606061046f610581565b6104776111e2565b604051602001610488929190613cb1565b604051602081830303815290604052905090565b60006104a933848461246c565b5060015b92915050565b6008546001600160a01b031681565b60005481565b6001600160a01b03831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1461056b576001600160a01b0384166000908152600260209081526040808320338452909152902054610546908363ffffffff6124d416565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610576848484612516565b5060015b9392505050565b6008546040516060916001600160a01b0316906105dc9082906105c8907f95d89b410000000000000000000000000000000000000000000000000000000090602001613c09565b6040516020818303038152906040526125c6565b91505090565b610624600f546001146e2237b637b6b4ba32a0b6b6a830b4b960891b7f6c6f636b6564000000000000000000000000000000000000000000000000000061267a565b6000600f55600654604080516002808252606080830184526001600160a01b0390941693926020830190803883395050600b5482519293506fffffffffffffffffffffffffffffffff169183915060009061067b57fe5b602002602001018181525050600b60109054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16816001815181106106c557fe5b602002602001018181525050600061072d600a60009054906101000a90046dffffffffffffffffffffffffffff166dffffffffffffffffffffffffffff16610721858560008151811061071457fe5b6020026020010151612730565b9063ffffffff6124d416565b90506000610772600a600e9054906101000a90046dffffffffffffffffffffffffffff166dffffffffffffffffffffffffffff16610721868660018151811061071457fe5b60408051600280825260608083018452939450909160208301908038833901905050905082816000815181106107a457fe5b60200260200101818152505081816001815181106107be57fe5b60209081029190910101526007546040517f87ff090a0000000000000000000000000000000000000000000000000000000081526001600160a01b03909116906387ff090a9061081b906000908b908b908a908890600401613d75565b600060405180830381600087803b15801561083557600080fd5b505af1158015610849573d6000803e3d6000fd5b50506001600f55505050505050505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601290565b60035481565b670de0b6b3a764000081565b600b546fffffffffffffffffffffffffffffffff1681565b6108b661320d565b6108be613236565b6006546040805160e0810182526001600160a01b03909216808352600b546fffffffffffffffffffffffffffffffff808216602086018190527001000000000000000000000000000000009092041692840192909252919060608201906109269084906127f6565b815260200161096583600b60109054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff166127f6565b8152600b546040517f56ea84b20000000000000000000000000000000000000000000000000000000081526020909201916001600160a01b038516916356ea84b2916109c6916fffffffffffffffffffffffffffffffff1690600401613e6e565b60606040518083038186803b1580156109de57600080fd5b505afa1580156109f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610a169190810190613764565b8152600b546040517f56ea84b20000000000000000000000000000000000000000000000000000000081526020909201916001600160a01b038516916356ea84b291610a8b9170010000000000000000000000000000000090046fffffffffffffffffffffffffffffffff1690600401613e6e565b60606040518083038186803b158015610aa357600080fd5b505afa158015610ab7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610adb9190810190613764565b90528051909250610b2b91506001600160a01b031633146e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c69642073656e64657200000000000000000000000000000000000061267a565b8751610b75906001600160a01b031630146e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c6964206d616b6572206163636f756e74206f776e6572000000000061267a565b610bb988602001516000146e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c6964206d616b6572206163636f756e74206e756d6265720000000061267a565b8651600854610c3c916001600160a01b03918216911614801590610bed575087516009546001600160a01b03908116911614155b8015610c03575087516001600160a01b03163014155b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c69642074616b6572206163636f756e74206f776e6572000000000061267a565b600080610c9083602001518d1480610c57575083604001518d145b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c696420696e707574206d61726b657400000000000000000000000061267a565b610ce183602001518c1480610ca8575083604001518c145b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c6964206f7574707574206d61726b6574000000000000000000000061267a565b8551610d20906e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e70757420776569206d75737420626520706f73697469766500000000000061267a565b600085806020019051610d3691908101906137be565b9050610d78600082116e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e73756666696369656e74206f757470757420616d6f756e7400000000000061267a565b83602001518d1415610dc85760208701516060850151610d9d9163ffffffff6128aa16565b60608501526080840151610db7908263ffffffff6124d416565b608085015260009250905080610e15565b83604001518d14610dd557fe5b60208701516080850151610dee9163ffffffff6128aa16565b60808501526060840151610e08908263ffffffff6124d416565b6060850152915060009050815b50600080600080610e24611b30565b5091509150610e93826dffffffffffffffffffffffffffff1687108015610e5a5750816dffffffffffffffffffffffffffff1686105b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e73756666696369656e74206c69717569646974790000000000000000000061267a565b85826dffffffffffffffffffffffffffff1603876060015111610eb7576000610ed1565b85826dffffffffffffffffffffffffffff16038760600151035b935084816dffffffffffffffffffffffffffff1603876080015111610ef7576000610f11565b84816dffffffffffffffffffffffffffff16038760800151035b9250610f5e6000851180610f255750600084115b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e73756666696369656e7420696e70757420616d6f756e740000000000000061267a565b6000610f8b610f7486600363ffffffff6128e916565b60608a0151610721906103e863ffffffff6128e916565b90506000610fba610fa386600363ffffffff6128e916565b60808b0151610721906103e863ffffffff6128e916565b9050611040610ff5620f4240610fe96dffffffffffffffffffffffffffff88811690881663ffffffff6128e916565b9063ffffffff6128e916565b611005848463ffffffff6128e916565b10156e2237b637b6b4ba32a0b6b6a830b4b960891b7f4b0000000000000000000000000000000000000000000000000000000000000061267a565b61113861107a670de0b6b3a76400008b60a00151602001516bffffffffffffffffffffffff168c6060015161293d9092919063ffffffff16565b60c08b01516020015160808c01516110af91670de0b6b3a7640000906bffffffffffffffffffffffff1663ffffffff61293d16565b60a08c0151602001516110f1906dffffffffffffffffffffffffffff891690670de0b6b3a7640000906bffffffffffffffffffffffff1663ffffffff61293d16565b60c08d015160200151611133906dffffffffffffffffffffffffffff891690670de0b6b3a7640000906bffffffffffffffffffffffff1663ffffffff61293d16565b6129e6565b505050508a600001516001600160a01b0316336001600160a01b03167fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822848488886040516111899493929190613e97565b60405180910390a3604080516080810190915260008082526020820190815260200160008152602001600086116111c057846111c2565b855b90529e9d5050505050505050505050505050565b600c5481565b600d5481565b6009546040516060916001600160a01b0316906105dc9082906105c8907f95d89b410000000000000000000000000000000000000000000000000000000090602001613c09565b600b5470010000000000000000000000000000000090046fffffffffffffffffffffffffffffffff1681565b6000611299600f546001146e2237b637b6b4ba32a0b6b6a830b4b960891b7f6c6f636b6564000000000000000000000000000000000000000000000000000061267a565b6000600f819055806112a9611579565b50600654600b549294509092506001600160a01b0316906000906112e09083906fffffffffffffffffffffffffffffffff16612730565b600b5490915060009061131a90849070010000000000000000000000000000000090046fffffffffffffffffffffffffffffffff16612730565b9050600061133e836dffffffffffffffffffffffffffff881663ffffffff6124d416565b90506000611362836dffffffffffffffffffffffffffff881663ffffffff6124d416565b90506113a4600083116e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c6964206d696e7420616d6f756e742030000000000000000000000061267a565b6113e4600082116e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e76616c6964206d696e7420616d6f756e742031000000000000000000000061267a565b60006113f08888612c70565b6000549091508061142d576114196103e8610721611414878763ffffffff6128e916565b612dd4565b995061142860006103e8612e26565b61148a565b6114876dffffffffffffffffffffffffffff8a16611451868463ffffffff6128e916565b8161145857fe5b046dffffffffffffffffffffffffffff8a1661147a868563ffffffff6128e916565b8161148157fe5b04612ebf565b99505b6114ca60008b116e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e73756666696369656e74206c6971756964697479206d696e74656400000061267a565b6114d48b8b612e26565b6114e086868b8b6129e6565b811561152257600a5461151e906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6128e916565b600e555b336001600160a01b03167f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f858560405161155d929190613e7c565b60405180910390a250506001600f555095979650505050505050565b600a546dffffffffffffffffffffffffffff808216926e0100000000000000000000000000008304909116917c0100000000000000000000000000000000000000000000000000000000900463ffffffff1690565b60016020526000908152604090205481565b600e5481565b6006546001600160a01b031681565b60046020526000908152604090205481565b6060611611610581565b6116196111e2565b604051602001610488929190613c83565b60008061166f600f546001146e2237b637b6b4ba32a0b6b6a830b4b960891b7f6c6f636b6564000000000000000000000000000000000000000000000000000061267a565b6000600f8190558061167f611579565b50600654604080516002808252606080830184529597509395506001600160a01b039092169392906020830190803883395050600b5482519293506fffffffffffffffffffffffffffffffff16918391506000906116d957fe5b602002602001018181525050600b60109054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff168160018151811061172357fe5b6020026020010181815250506000611742838360008151811061071457fe5b90506000611757848460018151811061071457fe5b306000908152600160205260408120548551929350909182906001600160a01b038816906356ea84b2908890849061178b57fe5b60200260200101516040518263ffffffff1660e01b81526004016117af9190613cd8565b60606040518083038186803b1580156117c757600080fd5b505afa1580156117db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506117ff9190810190613764565b602001516bffffffffffffffffffffffff1690506000876001600160a01b03166356ea84b28860018151811061183157fe5b60200260200101516040518263ffffffff1660e01b81526004016118559190613cd8565b60606040518083038186803b15801561186d57600080fd5b505afa158015611881573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506118a59190810190613764565b602001516bffffffffffffffffffffffff1690506118c38a8a612c70565b6000549094506118fc83670de0b6b3a7640000836118e7888c63ffffffff6128e916565b816118ee57fe5b04919063ffffffff61293d16565b9c5061191c82670de0b6b3a7640000836118e7888b63ffffffff6128e916565b9b5061196a60008e118015611931575060008d115b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f696e73756666696369656e74206c6971756964697479206275726e656400000061267a565b6119743085612ed5565b50506040805160028082526060808301845294509092509060208301908038833901905050905089816000815181106119a957fe5b60200260200101818152505088816001815181106119c357fe5b602002602001018181525050600760009054906101000a90046001600160a01b03166001600160a01b03166387ff090a60008e8e89866040518663ffffffff1660e01b8152600401611a19959493929190613d75565b600060405180830381600087803b158015611a3357600080fd5b505af1158015611a47573d6000803e3d6000fd5b50505050611a5c868660008151811061071457fe5b9350611a6f868660018151811061071457fe5b9250611a7d84848a8a6129e6565b8115611abf57600a54611abb906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6128e916565b600e555b8b6001600160a01b0316336001600160a01b03167fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d819364968c8c604051611b04929190613e7c565b60405180910390a350505050505050506001600f819055509250929050565b60006104a9338484612516565b600654600b546040517f56ea84b2000000000000000000000000000000000000000000000000000000008152600092839283926001600160a01b0390921691839183916356ea84b291611b9a916fffffffffffffffffffffffffffffffff90911690600401613e6e565b60606040518083038186803b158015611bb257600080fd5b505afa158015611bc6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611bea9190810190613764565b60200151600b546040517f56ea84b20000000000000000000000000000000000000000000000000000000081526bffffffffffffffffffffffff90921692506000916001600160a01b038516916356ea84b291611c709170010000000000000000000000000000000090046fffffffffffffffffffffffffffffffff1690600401613e6e565b60606040518083038186803b158015611c8857600080fd5b505afa158015611c9c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611cc09190810190613764565b60200151600a546bffffffffffffffffffffffff9091169150611d02906dffffffffffffffffffffffffffff1683670de0b6b3a764000063ffffffff61293d16565b600a54909650611d3d906e01000000000000000000000000000090046dffffffffffffffffffffffffffff1682670de0b6b3a764000061293d565b600a54969790967c0100000000000000000000000000000000000000000000000000000000900463ffffffff1695509350505050565b6103e881565b600554611dc4906001600160a01b031633146e2237b637b6b4ba32a0b6b6a830b4b960891b7f666f7262696464656e000000000000000000000000000000000000000000000061267a565b6040517f61bf17b4000000000000000000000000000000000000000000000000000000008152611e96906001600160a01b038316906361bf17b490611e0d903090600401613cbc565b60206040518083038186803b158015611e2557600080fd5b505afa158015611e39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611e5d9190810190613711565b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f7472616e736665722070726f7879206e6f7420656e61626c656400000000000061267a565b600880546001600160a01b038086167fffffffffffffffffffffffff0000000000000000000000000000000000000000928316179092556009805492851692909116919091179055604080517f76354857000000000000000000000000000000000000000000000000000000008152905133916376354857916004808301926020929190829003018186803b158015611f2e57600080fd5b505afa158015611f42573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611f66919081019061355d565b600680547fffffffffffffffffffffffff00000000000000000000000000000000000000009081166001600160a01b039384161791829055600780549091168484161790556008546040517f8fae3be100000000000000000000000000000000000000000000000000000000815291831692638fae3be192611fee9290911690600401613cbc565b60206040518083038186803b15801561200657600080fd5b505afa15801561201a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061203e91908101906137be565b600b80547fffffffffffffffffffffffffffffffff00000000000000000000000000000000166fffffffffffffffffffffffffffffffff929092169190911790556006546009546040517f8fae3be10000000000000000000000000000000000000000000000000000000081526001600160a01b0392831692638fae3be1926120cc92911690600401613cbc565b60206040518083038186803b1580156120e457600080fd5b505afa1580156120f8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061211c91908101906137be565b600b80546fffffffffffffffffffffffffffffffff928316700100000000000000000000000000000000029216919091179055505050565b6005546001600160a01b031681565b6009546001600160a01b031681565b6121c0428510157f446f6c6f6d697465416d6d4552433230000000000000000000000000000000007f657870697265640000000000000000000000000000000000000000000000000061267a565b6003546001600160a01b03881660009081526004602090815260408083208054600181019091559051929392612221927f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9928d928d928d92918d9101613ce6565b60405160208183030381529060405280519060200120604051602001612248929190613c52565b6040516020818303038152906040528051906020012090506000600182868686604051600081526020016040526040516122859493929190613d40565b6020604051602081039080840390855afa1580156122a7573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe00151915061234690506001600160a01b038216158015906122ff5750896001600160a01b0316826001600160a01b0316145b7f446f6c6f6d697465416d6d4552433230000000000000000000000000000000007f696e76616c6964207369676e617475726500000000000000000000000000000061267a565b61235189898961246c565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b6007546001600160a01b031681565b6123ca600f546001146e2237b637b6b4ba32a0b6b6a830b4b960891b7f6c6f636b6564000000000000000000000000000000000000000000000000000061267a565b6000600f55600654600b546001600160a01b0390911690612464906124029083906fffffffffffffffffffffffffffffffff16612730565b600b5461243690849070010000000000000000000000000000000090046fffffffffffffffffffffffffffffffff16612730565b600a546dffffffffffffffffffffffffffff808216916e0100000000000000000000000000009004166129e6565b506001600f55565b6001600160a01b0380841660008181526002602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906124c7908590613cd8565b60405180910390a3505050565b600061057a83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250612f6b565b6001600160a01b03831660009081526001602052604090205461253f908263ffffffff6124d416565b6001600160a01b038085166000908152600160205260408082209390935590841681522054612574908263ffffffff6128aa16565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906124c7908590613cd8565b606060006060846001600160a01b0316846040516125e49190613c1e565b600060405180830381855afa9150503d806000811461261f576040519150601f19603f3d011682016040523d82523d6000602084013e612624565b606091505b5091509150818015612637575060008151115b156126595780806020019051612650919081019061372f565b925050506104ad565b60405180602001604052806000815250925050506104ad565b505092915050565b8261272b5761268882612fb1565b7f3a200000000000000000000000000000000000000000000000000000000000006126b283612fb1565b6040516020016126c493929190613c2a565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261272291600401613dc3565b60405180910390fd5b505050565b60408051808201825230815260006020820181905291517f47d1b53c0000000000000000000000000000000000000000000000000000000081526001600160a01b038516916347d1b53c9161278a91908690600401613e02565b604080518083038186803b1580156127a157600080fd5b505afa1580156127b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506127d99190810190613782565b602001516fffffffffffffffffffffffffffffffff169392505050565b60408051808201825230815260006020820181905291517fc190c2ec0000000000000000000000000000000000000000000000000000000081526001600160a01b0385169163c190c2ec9161285091908690600401613e02565b604080518083038186803b15801561286757600080fd5b505afa15801561287b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061289f91908101906137a0565b602001519392505050565b60008282018381101561057a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161272290613dd4565b6000826128f8575060006104ad565b8282028284828161290557fe5b041461057a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161272290613de4565b600083158061294a575082155b156129615761295a600083613085565b905061057a565b6000612973858563ffffffff6128e916565b90506129dd6129aa600161299e6002612992888463ffffffff6124d416565b9063ffffffff61308516565b9063ffffffff6128aa16565b6129ba838663ffffffff6130c716565b10156129c75760006129ca565b60015b60ff1661299e838663ffffffff61308516565b95945050505050565b612a4e6dffffffffffffffffffffffffffff8511801590612a1557506dffffffffffffffffffffffffffff8411155b6e2237b637b6b4ba32a0b6b6a830b4b960891b7f62616c616e6365206f766572666c6f770000000000000000000000000000000061267a565b600a5463ffffffff428116917c010000000000000000000000000000000000000000000000000000000090048116820390811615801590612a9e57506dffffffffffffffffffffffffffff841615155b8015612ab957506dffffffffffffffffffffffffffff831615155b15612b69578063ffffffff16612afc85612ad286613109565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169063ffffffff61312d16565b600c80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092169290920201905563ffffffff8116612b3c84612ad287613109565b600d80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff92909216929092020190555b600a80547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff166e0100000000000000000000000000008883168102919091177bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167c010000000000000000000000000000000000000000000000000000000063ffffffff87160217928390556040517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad193612c6093818116939091041690613e1d565b60405180910390a1505050505050565b600080600560009054906101000a90046001600160a01b03166001600160a01b031663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b158015612cc157600080fd5b505afa158015612cd5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250612cf9919081019061355d565b600e546001600160a01b038216158015945091925090612dc1578015612dbc576000612d416114146dffffffffffffffffffffffffffff88811690881663ffffffff6128e916565b90506000612d4e83612dd4565b905080821115612db9576000612d7c612d6d848463ffffffff6124d416565b6000549063ffffffff6128e916565b90506000612d958361299e86600263ffffffff6128e916565b90506000818381612da257fe5b0490508015612db557612db58782612e26565b5050505b50505b612672565b8015612672576000600e55505092915050565b60006003821115612e17575080600160028204015b81811015612e1157809150600281828581612e0057fe5b040181612e0957fe5b049050612de9565b50612e21565b8115612e21575060015b919050565b600054612e39908263ffffffff6128aa16565b60009081556001600160a01b038316815260016020526040902054612e64908263ffffffff6128aa16565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90612eb3908590613cd8565b60405180910390a35050565b6000818310612ece578161057a565b5090919050565b6001600160a01b038216600090815260016020526040902054612efe908263ffffffff6124d416565b6001600160a01b03831660009081526001602052604081209190915554612f2b908263ffffffff6124d416565b60009081556040516001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90612eb3908590613cd8565b60008184841115612fa9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127229190613dc3565b505050900390565b60608082604051602001612fc59190613bf4565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052905060205b801561306e5781517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9091019082908290811061303157fe5b01602001517fff0000000000000000000000000000000000000000000000000000000000000016156130695760010181529050612e21565b612ff8565b505060408051600081526020810190915292915050565b600061057a83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f00000000000081525061316e565b600061057a83836040518060400160405280601881526020017f536166654d6174683a206d6f64756c6f206279207a65726f00000000000000008152506131bf565b6dffffffffffffffffffffffffffff166e0100000000000000000000000000000290565b60006dffffffffffffffffffffffffffff82167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff84168161316657fe5b049392505050565b600081836131a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127229190613dc3565b5060008385816131b557fe5b0495945050505050565b600081836131fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016127229190613dc3565b5082848161320457fe5b06949350505050565b604080516080810190915260008082526020820190815260200160008152602001600081525090565b6040518060e0016040528060006001600160a01b0316815260200160008152602001600081526020016000815260200160008152602001613275613287565b8152602001613282613287565b905290565b604080516060810182526000808252602082018190529181019190915290565b80356104ad81614089565b80516104ad81614089565b80356104ad8161409d565b80516104ad8161409d565b80356104ad816140a6565b600082601f8301126132ef57600080fd5b81356133026132fd82613ee7565b613ec0565b9150808252602083016020830185838301111561331e57600080fd5b61332983828461401c565b50505092915050565b600082601f83011261334357600080fd5b81516133516132fd82613ee7565b9150808252602083016020830185838301111561336d57600080fd5b613329838284614028565b60006060828403121561338a57600080fd5b6133946060613ec0565b905060006133a2848461352c565b82525060206133b38484830161352c565b60208301525060406133c784828501613516565b60408301525092915050565b6000604082840312156133e557600080fd5b6133ef6040613ec0565b905060006133fd84846132a7565b825250602061340e848483016132d3565b60208301525092915050565b60006040828403121561342c57600080fd5b6134366040613ec0565b9050600061344484846132bd565b825250602061340e848483016134f5565b60006040828403121561346757600080fd5b6134716040613ec0565b9050600061347f84846132c8565b825250602061340e84848301613500565b6000604082840312156134a257600080fd5b6134ac6040613ec0565b905060006133fd84846132bd565b6000604082840312156134cc57600080fd5b6134d66040613ec0565b905060006134e484846132c8565b825250602061340e8484830161350b565b80356104ad816140af565b80516104ad816140af565b80516104ad816140a6565b80516104ad816140b8565b80356104ad816140c1565b80516104ad816140ca565b60006020828403121561354957600080fd5b600061355584846132a7565b949350505050565b60006020828403121561356f57600080fd5b600061355584846132b2565b6000806040838503121561358e57600080fd5b600061359a85856132a7565b92505060206135ab858286016132a7565b9150509250929050565b6000806000606084860312156135ca57600080fd5b60006135d686866132a7565b93505060206135e7868287016132a7565b92505060406135f8868287016132a7565b9150509250925092565b60008060006060848603121561361757600080fd5b600061362386866132a7565b9350506020613634868287016132a7565b92505060406135f8868287016132d3565b600080600080600080600060e0888a03121561366057600080fd5b600061366c8a8a6132a7565b975050602061367d8a828b016132a7565b965050604061368e8a828b016132d3565b955050606061369f8a828b016132d3565b94505060806136b08a828b01613521565b93505060a06136c18a828b016132d3565b92505060c06136d28a828b016132d3565b91505092959891949750929550565b600080604083850312156136f457600080fd5b600061370085856132a7565b92505060206135ab858286016132d3565b60006020828403121561372357600080fd5b600061355584846132c8565b60006020828403121561374157600080fd5b815167ffffffffffffffff81111561375857600080fd5b61355584828501613332565b60006060828403121561377657600080fd5b60006135558484613378565b60006040828403121561379457600080fd5b60006135558484613455565b6000604082840312156137b257600080fd5b600061355584846134ba565b6000602082840312156137d057600080fd5b6000613555848461350b565b6000806000806000806000806101a0898b0312156137f957600080fd5b60006138058b8b6132d3565b98505060206138168b828c016132d3565b97505060406138278b828c016133d3565b96505060806138388b828c016133d3565b95505060c06138498b828c0161341a565b94505061010061385b8b828c0161341a565b93505061014061386d8b828c01613490565b92505061018089013567ffffffffffffffff81111561388b57600080fd5b6138978b828c016132de565b9150509295985092959890939650565b60006138b3838361393d565b505060200190565b6138c481613f40565b82525050565b60006138d582613f33565b6138df8185613f37565b93506138ea83613f2d565b8060005b8381101561391857815161390288826138a7565b975061390d83613f2d565b9250506001016138ee565b509495945050505050565b6138c481613f4b565b6138c461393882613f50565b613f75565b6138c481613f75565b6138c461393882613f75565b6138c461393882613f78565b600061396982613f33565b6139738185612e21565b9350613983818560208601614028565b9290920192915050565b6138c481613ffb565b6138c481614006565b60006139aa82613f33565b6139b48185613f37565b93506139c4818560208601614028565b6139cd81614054565b9093019392505050565b60006139e4600283612e21565b7f1901000000000000000000000000000000000000000000000000000000000000815260020192915050565b6000613a1d601b83613f37565b7f536166654d6174683a206164646974696f6e206f766572666c6f770000000000815260200192915050565b6000613a56600483612e21565b7f444c505f00000000000000000000000000000000000000000000000000000000815260040192915050565b6000613a8f602183613f37565b7f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f81527f7700000000000000000000000000000000000000000000000000000000000000602082015260400192915050565b6000613aee600183612e21565b7f5f00000000000000000000000000000000000000000000000000000000000000815260010192915050565b6000613b27601383612e21565b7f446f6c6f6d697465204c5020546f6b656e3a2000000000000000000000000000815260130192915050565b80516080830190613b648482613923565b506020820151613b77602085018261398d565b506040820151613b8a604085018261398d565b506060820151613b9d606085018261393d565b50505050565b80516040830190613bb484826138bb565b506020820151613b9d602085018261393d565b6138c481613fa7565b6138c481613fba565b6138c481614011565b6138c481613fdb565b6138c481613fe4565b6000613c008284613946565b50602001919050565b6000613c158284613952565b50600401919050565b600061057a828461395e565b6000613c36828661395e565b9150613c42828561392c565b6002820191506129dd828461395e565b6000613c5d826139d7565b9150613c698285613946565b602082019150613c798284613946565b5060200192915050565b6000613c8e82613a49565b9150613c9a828561395e565b9150613ca582613ae1565b9150613555828461395e565b6000613c8e82613b1a565b602081016104ad82846138bb565b602081016104ad8284613923565b602081016104ad828461393d565b60c08101613cf4828961393d565b613d0160208301886138bb565b613d0e60408301876138bb565b613d1b606083018661393d565b613d28608083018561393d565b613d3560a083018461393d565b979650505050505050565b60808101613d4e828761393d565b613d5b6020830186613beb565b613d68604083018561393d565b6129dd606083018461393d565b60a08101613d838288613996565b613d9060208301876138bb565b613d9d604083018661393d565b8181036060830152613daf81856138ca565b90508181036080830152613d3581846138ca565b6020808252810161057a818461399f565b602080825281016104ad81613a10565b602080825281016104ad81613a82565b608081016104ad8284613b53565b60608101613e108285613ba3565b61057a604083018461393d565b60408101613e2b8285613bc7565b61057a6020830184613bc7565b60608101613e468286613bc7565b613e536020830185613bc7565b6135556040830184613be2565b602081016104ad8284613bd0565b602081016104ad8284613bd9565b60408101613e8a828561393d565b61057a602083018461393d565b60808101613ea5828761393d565b613d5b602083018661393d565b602081016104ad8284613beb565b60405181810167ffffffffffffffff81118282101715613edf57600080fd5b604052919050565b600067ffffffffffffffff821115613efe57600080fd5b506020601f919091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160190565b60200190565b5190565b90815260200190565b60006104ad82613fcf565b151590565b7fffff0000000000000000000000000000000000000000000000000000000000001690565b90565b7fffffffff000000000000000000000000000000000000000000000000000000001690565b80612e218161407c565b6dffffffffffffffffffffffffffff1690565b6fffffffffffffffffffffffffffffffff1690565b6001600160a01b031690565b63ffffffff1690565b60ff1690565b6bffffffffffffffffffffffff1690565b60006104ad82613f9d565b60006104ad82613f75565b60006104ad82613fba565b82818337506000910152565b60005b8381101561404357818101518382015260200161402b565b83811115613b9d5750506000910152565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01690565b6002811061408657fe5b50565b61409281613f40565b811461408657600080fd5b61409281613f4b565b61409281613f75565b61409281613fba565b61409281613fdb565b61409281613fe4565b61409281613fea56fea365627a7a72315820caec0e4984d5b8a8e0dadb993c8e4cb529c3578fd2f359509ea0e40f1dade1cc6c6578706572696d656e74616cf564736f6c63430005100040'

// this _could_ go in constants, except that it would cost every consumer of the sdk the CPU to compute the hash
// and load the JSON.
const MUMBAI_COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [mumbaiBytecode])
const ARBITRUM_COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [mumbaiBytecode])

describe('constants', () => {
  describe('INIT_CODE_HASH', () => {
    it('matches Mumbai computed bytecode hash', () => {
      expect(MUMBAI_COMPUTED_INIT_CODE_HASH).toEqual(INIT_CODE_HASHES[80001])
    })
    it('matches Arbitrum computed bytecode hash', () => {
      expect(ARBITRUM_COMPUTED_INIT_CODE_HASH).toEqual(ARBITRUM_COMPUTED_INIT_CODE_HASH)
    })
  })
})
