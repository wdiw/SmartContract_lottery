pragma solidity ^0.4.17;

contract Lottery{
    address manager;
    address[] players;

    function lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 1 ether);
        players.push(msg.sender);
    }

    function getManagerAddress() public view returns(address) {
        return manager;
    }

    function getPlayer1() public view returns(address){
        return players[0];
    }

    function random()  private view returns(uint){
        return uint(keccak256(block.difficulty,now,players));
    }

    function pickWinner() public  {
        // uint index = random() % players.length;
        players[0].transfer(this.balance);
    } 


    function getPlayers() public view returns(address[] ){
        return players;
    }
}