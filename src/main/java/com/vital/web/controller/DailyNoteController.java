package com.vital.web.controller;

import com.vital.web.json.DailyNoteResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dailyNote")
public class DailyNoteController {

    @RequestMapping(value="/id", method = RequestMethod.GET)
    public @ResponseBody
    DailyNoteResource getNote() {
        DailyNoteResource note = new DailyNoteResource();
        note.setId("1234");
        note.setDescription("Description text");
        return note;
    }

}