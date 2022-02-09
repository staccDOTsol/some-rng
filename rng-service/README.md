# Build and deploy
anchor build && anchor deploy

# Publish
anchor idl init --filepath target/idl/puppet_master.json 37cqo9JLTq26HyVPt6LcLkQ4pcFBm6vUAS2n7GtEvrAd
anchor idl upgrade --filepath target/idl/puppet_master.json 37cqo9JLTq26HyVPt6LcLkQ4pcFBm6vUAS2n7GtEvrAd
