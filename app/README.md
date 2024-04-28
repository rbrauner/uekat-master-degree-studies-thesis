# uekat-master-degree-studies-thesis-app

UE Katowice - Master Degree Studies - Thesis - App

## Requirements

- [Node 20.12.2](https://nodejs.org)
- [Pnpm 9.0.6](https://pnpm.io)

## Installation

### Dependencies

```sh
pnpm install
```

## Run

```sh
pnpm run dev
```

## Troubleshooting

### Cannot connect drone <-> PC

Solution: unlock firewall

```sh
sudo firewall-cmd --zone=public --add-port=8889/udp --permanent
sudo firewall-cmd --zone=public --add-port=8890/udp --permanent
sudo firewall-cmd --zone=public --add-port=11111/udp --permanent
sudo firewall-cmd --reload
```
