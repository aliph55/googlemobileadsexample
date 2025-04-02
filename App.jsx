import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = TestIds.REWARDED; // "ca-app-pub-3940256099942544/5224354917"

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function App() {
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log(`Kullanıcı ${reward.amount} ${reward.type} kazandı!`);
      }
    );

    const unsubscribeError = rewarded.addAdEventListener(RewardedAdEventType.ERROR, (error) => {
      console.log('Reklam yüklenemedi:', error);
    });

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeError();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Rewarded Reklam Göster"
        onPress={() => {
          if (rewarded.loaded) {
            rewarded.show();
          } else {
            rewarded.load();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});