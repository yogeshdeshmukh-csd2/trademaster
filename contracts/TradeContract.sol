pragma solidity >=0.4.21 <0.7.0;

contract TradeContract {

    /**
    Trade Status Enum to represent various Trade Status
    */
    enum TradeStatus { SUBMITTED, INPROCESS, SETTLED }

    TradeStatus defaultStatus;

    /**
    Constructor sets Default Trade status value to Submitted
    */
    constructor() public{
        defaultStatus = TradeStatus.SUBMITTED;
    }

    /**
    struct to represent a Trade.
    tradeId     : id to uniquely identify a trade
    sender      : Bank Address whom creates the Trade
    recipient   : Bank Address whom recieve the Trade
    amount      : Trade amount.
    tradeDate   : DateTime of Trade Submitted.
    TradeStatus : Trade Status represents current trade status.
     */
    struct Trade {
        bytes32 tradeId;
        address sender;
        address recipient;
        uint256 amount;
        uint256 tradeDate;
        TradeStatus tradeStatus;
    }

    /**
    Evant tradeEvent to get triggered every time new trade get submitted.
    tradeId     : id to uniquely identify a trade
    sender      : Bank Address whom creates the Trade
    recipient   : Bank Address whom recieve the Trade
    amount      : Trade amount.
    tradeDate   : DateTime of Trade Submitted.
    TradeStatus : Trade Status represents current trade status.
     */
    event tradeEvent (
        bytes32 _tradeId,
        address _sender,
        address _recipient,
        uint256 _amount,
        uint256 _tradeDate,
        uint _tradeStatus
    );

    /**
    Trade Data mapping to store the trade parameters after submitted.
    key: TradeID,
    value: Trade Struct
    */
	mapping (bytes32 => Trade) tradeData;


    /**
    function: addTrade to accept variouse trade parameters and stores into trade mapping,
    emits tradeEvent.
    @param _tradeId     : id to uniquely identify a trade
    @param _sender      : Bank Address whom creates the Trade
    @param _recipient   : Bank Address whom recieve the Trade
    @param _amount      : Trade amount.
    @param _tradeDate   : DateTime of Trade Submitted.
    */
    function  addTrade(
    bytes32 _tradeId,
    address _sender,
    address _recipient,
    uint _amount,
    uint _tradeDate
    ) external {
        tradeData[_tradeId] = Trade(
            _tradeId,
            _sender,
            _recipient,
            _amount,
            _tradeDate,
            defaultStatus);

        emit tradeEvent(
            _tradeId,
            _sender,
            _recipient,
            _amount,
            _tradeDate,
            uint(defaultStatus));
    }

    /**
    function: addTrade to accept variouse trade parameters and stores into trade mapping,
    emits tradeEvent.
    @param _tradeId     : id to uniquely identify a trade
    @return address     : Bank Address whom creates the Trade
    @return address     : Bank Address whom recieve the Trade
    @return uint        : Trade amount.
    @return uint        : trade DateTime in uint.
    @return uint        : Trade Status in uint.
    */
    function getTrade(bytes32 _tradeId) public view returns (address, address, uint, uint, uint)
    {
        return (
        tradeData[_tradeId].sender,
        tradeData[_tradeId].recipient,
        tradeData[_tradeId].amount,
        tradeData[_tradeId].tradeDate,
        uint(tradeData[_tradeId].tradeStatus)
        );
    }

}
