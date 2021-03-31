package deploy.nyxo.app;
import android.os.Bundle; 
import com.zoontek.rnbootsplash.RNBootSplash;
import android.content.res.Configuration; 
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(null);
			int drawableId = (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES
							? R.drawable.bootsplash_dark
							: R.drawable.bootsplash_light; //Default light theme
			RNBootSplash.init(drawableId, MainActivity.this);
	}
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Deploy";
  }
	
}
