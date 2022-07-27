export type SolanaSummer = {
  version: "0.1.0"
  name: "solana_summer"
  instructions: [
    {
      name: "createRewardMint"
      accounts: [
        {
          name: "rewardData"
          isMut: true
          isSigner: false
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadata"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMetadataProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "rebateBasisPoints"
          type: "u64"
        },
        {
          name: "bonusBasisPoints"
          type: "u64"
        },
        {
          name: "uri"
          type: "string"
        },
        {
          name: "name"
          type: "string"
        },
        {
          name: "symbol"
          type: "string"
        }
      ]
    },
    {
      name: "createLoyaltyMint"
      accounts: [
        {
          name: "rewardData"
          isMut: true
          isSigner: false
        },
        {
          name: "loyaltyMint"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadata"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMetadataProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "discountBasisPoints"
          type: "u64"
        },
        {
          name: "uri"
          type: "string"
        },
        {
          name: "name"
          type: "string"
        },
        {
          name: "symbol"
          type: "string"
        }
      ]
    },
    {
      name: "redeem"
      accounts: [
        {
          name: "rewardData"
          isMut: false
          isSigner: false
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
        },
        {
          name: "usdcMint"
          isMut: false
          isSigner: false
        },
        {
          name: "customerRewardToken"
          isMut: true
          isSigner: false
        },
        {
          name: "customerUsdcToken"
          isMut: true
          isSigner: false
        },
        {
          name: "userUsdcToken"
          isMut: true
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: false
        },
        {
          name: "customer"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "usdcToken"
          type: "u64"
        },
        {
          name: "rewardToken"
          type: "u64"
        }
      ]
    },
    {
      name: "mintNft"
      accounts: [
        {
          name: "rewardData"
          isMut: false
          isSigner: false
        },
        {
          name: "loyaltyMint"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "user"
          isMut: true
          isSigner: false
        },
        {
          name: "customerNft"
          isMut: true
          isSigner: false
        },
        {
          name: "customer"
          isMut: true
          isSigner: true
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: "tokenData"
      type: {
        kind: "struct"
        fields: [
          {
            name: "user"
            type: "publicKey"
          },
          {
            name: "rewardMint"
            type: "publicKey"
          },
          {
            name: "rewardBump"
            type: "u8"
          },
          {
            name: "rebateBasisPoints"
            type: "u64"
          },
          {
            name: "bonusBasisPoints"
            type: "u64"
          },
          {
            name: "loyaltyMint"
            type: "publicKey"
          },
          {
            name: "loyaltyBump"
            type: "u8"
          },
          {
            name: "discountBasisPoints"
            type: "u64"
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: "PDA"
      msg: "PDA not match"
    },
    {
      code: 6001
      name: "MATH"
      msg: "Math Error"
    }
  ]
}

export const IDL: SolanaSummer = {
  version: "0.1.0",
  name: "solana_summer",
  instructions: [
    {
      name: "createRewardMint",
      accounts: [
        {
          name: "rewardData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "rebateBasisPoints",
          type: "u64",
        },
        {
          name: "bonusBasisPoints",
          type: "u64",
        },
        {
          name: "uri",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
      ],
    },
    {
      name: "createLoyaltyMint",
      accounts: [
        {
          name: "rewardData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "loyaltyMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "discountBasisPoints",
          type: "u64",
        },
        {
          name: "uri",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
      ],
    },
    {
      name: "redeem",
      accounts: [
        {
          name: "rewardData",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "usdcMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "customerRewardToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "customerUsdcToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userUsdcToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "customer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "usdcToken",
          type: "u64",
        },
        {
          name: "rewardToken",
          type: "u64",
        },
      ],
    },
    {
      name: "mintNft",
      accounts: [
        {
          name: "rewardData",
          isMut: false,
          isSigner: false,
        },
        {
          name: "loyaltyMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "customerNft",
          isMut: true,
          isSigner: false,
        },
        {
          name: "customer",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "tokenData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "rewardMint",
            type: "publicKey",
          },
          {
            name: "rewardBump",
            type: "u8",
          },
          {
            name: "rebateBasisPoints",
            type: "u64",
          },
          {
            name: "bonusBasisPoints",
            type: "u64",
          },
          {
            name: "loyaltyMint",
            type: "publicKey",
          },
          {
            name: "loyaltyBump",
            type: "u8",
          },
          {
            name: "discountBasisPoints",
            type: "u64",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "PDA",
      msg: "PDA not match",
    },
    {
      code: 6001,
      name: "MATH",
      msg: "Math Error",
    },
  ],
}
