import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PSPDFKitView from 'react-native-pspdfkit';
import { NativeModules } from 'react-native';
import fileSystem from 'react-native-fs';

const PSPDFKit = NativeModules.PSPDFKit;
PSPDFKit.setLicenseKey(null);

function HomeScreen() {
  var pdfRef: React.RefObject<PSPDFKitView> = React.createRef();
  const writableFormDocumentPath = 'file://' + fileSystem.DocumentDirectoryPath + '/' + 'Document.pdf';

  return (
        <PSPDFKitView
        document={writableFormDocumentPath}
        configuration={{
          showThumbnailBar: 'scrollable',
          pageTransition: 'scrollContinuous',
          scrollDirection: 'vertical',
        }}
        ref={pdfRef}
        fragmentTag="PDF1"
        onDocumentLoaded={() => {
          console.log('onDocumentLoaded');
          pdfRef.current?.getDocument().invalidateCache();
        }}
        style={{flex: 1}}
      />
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer
      onReady={() => {
        const copy = fileSystem.copyFileAssets;
        const path = fileSystem.DocumentDirectoryPath + '/' + 'Document.pdf';
        const src = 'Document.pdf';
        copy(src, path);
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}