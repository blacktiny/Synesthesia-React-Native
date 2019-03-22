package com.synesthesia;

import android.app.Application;

import com.facebook.react.ReactApplication;
import iyegoroff.RNTextGradient.RNTextGradientPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.gettipsi.stripe.StripeReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNTextGradientPackage(),
            new BlurViewPackage(),
            new FastImageViewPackage(),
            new ReactNativeYouTube(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RNSoundPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new StripeReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
