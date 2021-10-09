import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import Bugsee from "react-native-bugsee";

export default function App() {
  const [path, setPath] = React.useState("");

  useEffect(() => {
    const attempt = async () => {
      try {
        const options = new Bugsee.IOSLaunchOptions();
        options.shakeToReport = false;
        options.reportPrioritySelector = true;
        options.screenshotEnabled = true;
        options.killDetection = true;
        options.maxRecordingTime = 30;
        
        // bugsee key goes here
        Bugsee.launch("", options);

        // const dest = env.paths.getTempPath({ suffix: 'jpg' });
        const dest = FileSystem.documentDirectory + "test.jpg";

        // console.log('making directories');
        // await FileSystem.makeDirectoryAsync(getLibraryDir());

        console.log("downloading file..");
        const res = await FileSystem.downloadAsync(
          "https://sync.getscribeware.com/steve@stevelamb.io/2021/10/07/5mvn8/Photop20Sepp2026p2Cp209p2019p2032p20AMp20(5).jpg",
          dest
        );

        console.log("done!", res);
        setPath(dest);
        // env.fs
        //   .downloadFile(
        //     'https://sync.getscribeware.com/steve@stevelamb.io/2021/10/07/5mvn8/Photop20Sepp2026p2Cp209p2019p2032p20AMp20(5).jpg',
        //     dest,
        //     { progress: () => {} }
        //   )
        //   .then(() => {
        //     console.log('done downloading');
        //     setPath(dest);
        //   });
      } catch (e) {
        console.log("error", e);
      }
    };

    attempt().then(() => console.log("done with attempt!"));
  }, []);

  console.log("path", path);

  return (
    <View style={styles.container}>
      <Text>Image:</Text>
      {path ? (
        <Image
          source={{
            uri: path,
          }}
          style={{ width: 200, height: 200 }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
