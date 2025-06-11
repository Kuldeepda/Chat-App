import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  ChatAppAddress,
  ChatAppABI,
  handleNetworkSwitch,
} from "../Context/constants";

export const ChechIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");
    const network = await handleNetworkSwitch();
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const network = await handleNetworkSwitch();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const converTime = (time) => {
  // Ensure correct time unit: seconds → milliseconds
  const timestamp =
    typeof time === "object" && typeof time.toNumber === "function"
      ? time.toNumber()
      : Number(time);

  const ms = timestamp.toString().length === 13 ? timestamp : timestamp * 1000;
  const newTime = new Date(ms);

  const hours = newTime.getHours().toString().padStart(2, "0");
  const minutes = newTime.getMinutes().toString().padStart(2, "0");
  const seconds = newTime.getSeconds().toString().padStart(2, "0");

  const day = newTime.getDate().toString().padStart(2, "0");
  const month = (newTime.getMonth() + 1).toString().padStart(2, "0");
  const year = newTime.getFullYear();

  return `${hours}:${minutes}:${seconds}  Date: ${day}/${month}/${year}`;
};
