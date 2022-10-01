const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy('testing');
  await domainContract.deployed();

  console.log('Contract deployed to:', domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register('gorduki', {
    value: hre.ethers.utils.parseEther('0.001'),
  });
  await txn.wait();
  console.log('Minted domain gorduki.testing');

  txn = await domainContract.setRecord(
    'gorduki',
    'Gorduki is the best dog ever!'
  );
  await txn.wait();
  console.log('Set record for gorduki.testing');

  const address = await domainContract.getAddress('gorduki');
  console.log('Owner of domain gorduki:', address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
