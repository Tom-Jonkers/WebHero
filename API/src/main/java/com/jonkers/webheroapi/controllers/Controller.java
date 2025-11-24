package com.jonkers.webheroapi.controllers;

import com.jonkers.webheroapi.models.Song;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static com.jonkers.webheroapi.services.SongService.getSong;

@RestController
public class Controller {

	@GetMapping("/song/{md5}")
	public Song getSongWithmd5(@PathVariable("md5") String md5) throws InterruptedException {
		Song sng = getSong(md5);
		return sng;
	}

	@GetMapping("/reverse/{string}")
	public String reverse(@PathVariable("string") String x)
	{
		char[] initialString = x.toCharArray();
		char[] reversedString = x.toCharArray();

		for (int i = 0; i < x.length(); i++)
		{
			reversedString[i] = initialString[x.length() - 1 - i];
		}

		return new String(reversedString);
	}

}
