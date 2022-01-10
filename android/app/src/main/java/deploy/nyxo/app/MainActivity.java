package deploy.nyxo.app;
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;
import android.content.res.Configuration; 
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
	@Override
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Deploy";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

     @Override
     protected void loadApp(String appKey) {
       RNBootSplash.init(MainActivity.this);
       super.loadApp(appKey);
     }
   };
 }
	
}
