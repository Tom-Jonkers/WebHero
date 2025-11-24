package com.jonkers.webheroapi.services;

import com.jonkers.webheroapi.models.Song;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.File;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;


public class SongService {

    public static void downloadFile(String md5) throws InterruptedException {
        String url = "https://www.enchor.us/download?md5=" + md5;
        String downloadPath = "C:\\tempy";

        // Create the directory if it doesn't exist
        File directory = new File(downloadPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Configure Chrome options for download
        ChromeOptions options = new ChromeOptions();
        Map<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        prefs.put("safebrowsing.enabled", false);
        prefs.put("profile.default_content_setting_values.automatic_downloads", 1);
        options.setExperimentalOption("prefs", prefs);

        // Appear more like a real browser
        options.addArguments("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);

        WebDriver driver = new ChromeDriver(options);

        try {
            // First navigate to main site to establish session/cookies
            driver.get("https://www.enchor.us");
            Thread.sleep(2000);

            // Now navigate to download URL
            driver.get(url);
            Thread.sleep(3000);


            // Wait for download
            File downloadedFile = waitForDownload(downloadPath, 5);

            if (downloadedFile != null) {
                File renamedFile = new File(downloadPath + "\\" + md5 + ".sng");
                if (renamedFile.exists()) {
                    renamedFile.delete();
                }
                downloadedFile.renameTo(renamedFile);
                System.out.println("File downloaded: " + renamedFile.getAbsolutePath());
            } else {
                System.out.println("Download failed - check if URL requires authentication or additional steps");
            }

        } finally {
            driver.quit();
        }
    }

    private static File waitForDownload(String downloadPath, int timeoutSeconds) throws InterruptedException {
        File dir = new File(downloadPath);
        long startTime = System.currentTimeMillis();

        // Get initial file list
        File[] existingFiles = dir.listFiles();
        Set<String> existingFileNames = new HashSet<>();
        if (existingFiles != null) {
            for (File f : existingFiles) {
                existingFileNames.add(f.getName());
            }
        }

        while ((System.currentTimeMillis() - startTime) / 1000 < timeoutSeconds) {
            File[] files = dir.listFiles();

            if (files != null) {
                for (File f : files) {
                    // Skip temp download files
                    if (f.getName().endsWith(".crdownload") ||
                            f.getName().endsWith(".tmp") ||
                            f.getName().endsWith(".part")) {
                        continue;
                    }

                    // Check if this is a new file
                    if (!existingFileNames.contains(f.getName())) {
                        // Wait to ensure download is complete
                        Thread.sleep(2000);
                        long size1 = f.length();
                        Thread.sleep(1000);
                        long size2 = f.length();

                        if (size1 == size2 && size1 > 0) {
                            return f;
                        }
                    }
                }
            }

            Thread.sleep(1000);
        }

        return null;
    }

    public static Song getSong(String md5) throws InterruptedException {
        Song sng = new Song();

        downloadFile(md5);

        return new Song();
    }
}
