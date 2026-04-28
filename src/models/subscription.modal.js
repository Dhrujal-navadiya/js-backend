import mongoose, { Schema } from "mongoose";

// channel was also one user
// who subscribe the channel that was also user

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is subscribing (Followers)
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, // one to whom subscriber is subscribing (jene loko follow kare chhe)
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);

// Theoires

// Subscription Schema

// Subscriber (User)

// Channel (User)

// User (a, b, c, d)
// Channel (chai-aur-code, jioHotstar, codeWithHarry)

// Document ==============

/// same user mulitple channel subscribe
// chai-aur-code for multiple user subscribing

// if i want to find any channels subscribers then how ?  =====================  important
// (select that document which one have chai-aur-code) counting that document where my channel is chai-aur-code

// Channel -> chai-aur-code (Subscriber -> a)
// Channel -> jioHotstar (Subscriber -> b)
// Channel -> chai-aur-code (Subscriber -> c)
// Channel -> codeWithHarry (Subscriber -> c)
// Channel -> jioHotstar (Subscriber -> c)

/// =============================================================================

// how to find i subscribed channels

// subpose you are user => c  how to find c e katla channel ne subscribe karyu chhe
//  subscriber value c find in document and channel ni list banavo (chai-aur-code, jioHotstar, codeWithHarry)
