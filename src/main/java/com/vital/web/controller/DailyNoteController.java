package com.vital.web.controller;

import com.vital.web.domain.DailyNote;
import com.vital.web.json.DailyNoteResource;
import com.vital.web.service.DailyNoteService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/dailyNote")
public class DailyNoteController {

    @Inject
    DailyNoteService dailyNoteService;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    List<DailyNoteResource> getAll() {
        List<DailyNoteResource> resources = new ArrayList<>();
        for(DailyNote note : dailyNoteService.findAll()){
            DailyNoteResource resource = new DailyNoteResource();
            resource.setId(note.getId());
            resource.setDescription(note.getDescription());
            resources.add(resource);
        }
        return resources;
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public @ResponseBody
    DailyNoteResource getById(@PathVariable String id) {
        DailyNote note = dailyNoteService.getById(id);
        DailyNoteResource resource = null;
        if(note!=null) {
            resource = new DailyNoteResource();
            resource.setId(note.getId());
            resource.setDescription(note.getDescription());
        }
        return resource;
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody
    DailyNoteResource post(@RequestBody DailyNoteResource resource){
        DailyNote dailyNote = new DailyNote();
        dailyNote.setId(resource.getId());
        dailyNote.setDescription(resource.getDescription());
        DailyNote savedDailyNote = dailyNoteService.create(dailyNote);
        return savedDailyNote!=null?resource:null;
    }

}