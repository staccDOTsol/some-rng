import { clusterApiUrl } from "@solana/web3.js";

type Cluster = {
  name: string;
  url: string;
};
export const CLUSTERS: Cluster[] = [
  {
    name: "mainnet-beta",
    url: "https://ssc-dao.genesysgo.net/",
  },
  {
    name: "testnet",
    url: clusterApiUrl("testnet"),
  },
  {
    name: "mainnet-beta",
    url: clusterApiUrl("mainnet-beta"),
  },
];
export const DEFAULT_CLUSTER = CLUSTERS[2];
export function getCluster(name: string): string {
  for (const cluster of CLUSTERS) {
    if (cluster.name === name) {
      return cluster.url;
    }
  }
  return DEFAULT_CLUSTER.url;
}
